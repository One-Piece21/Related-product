import axios from "axios"
const updateRelated = async function (id) {
  try {
    let response = await axios.get(`http://localhost:3002/data/${id}`);
    let data = response.data;
    let promises = data.map((elm) =>
      axios.get(`http://localhost:3002/image/${elm.id}`)
    );
    let responses = await Promise.all(promises);
    let images = responses.map((response) => response.data);
    data = data.map((elm, index) => ({ ...elm, image: images[index] }));
    return data;
  } catch (error) {
    return error;
  }
}

//updateRelated(11007).then((res) => console.log(res));
export default updateRelated