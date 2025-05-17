export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};

export const getPazienti = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "CIAO SONO PIETRO",
    }),
  };
};