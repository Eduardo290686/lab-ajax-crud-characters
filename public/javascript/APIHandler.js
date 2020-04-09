class APIHandler {

  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return axios.get(`${this.BASE_URL}/characters`)
      .then((payload) => {
        return payload.data;
      })
  }

  getOneRegister(id) {
    return axios.get(`${this.BASE_URL}/characters/${id}`)
      .then((payload) => {
        return payload.data;
      })
  }

  createOneRegister(newCharacterInfo) {
    let newCharacter = newCharacterInfo;
    return axios.post(`${this.BASE_URL}/characters`, newCharacter)
      .then((response) => {
        console.log(response.data);
      })
  }

  updateOneRegister(theId, updatedCharacterInfo) {
    axios.patch(`${this.BASE_URL}/characters/${theId}`, updatedCharacterInfo)
      .then(response => {
        console.log(response);
      })
  }

  deleteOneRegister(id) {
    return axios.delete(`${this.BASE_URL}/characters/${id}`)
      .then((payload) => {
        return payload.data;
      })
  }

}
