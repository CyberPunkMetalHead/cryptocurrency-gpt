export async function get({ params }) {
  const message = params.message;
  const number = 9999999;

  return new Response(JSON.stringify(number), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}