
const BASE_URL = "http://172.30.10.120";

const PostData = async (url, dataBody) => {
    let resData = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      mode: "cors",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    })
      .then((res) => res.json())
      .then(
        async (result) => {
          return result;
        },
        (error) => {
          console.error(error);
          return null;
        }
      );
    return resData;
  };
  
  export {PostData};