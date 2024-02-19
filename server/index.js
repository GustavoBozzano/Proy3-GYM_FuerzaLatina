import server from "./src/server.js";

console.log(">>>>>>", process.env.PORT);
console.log(">>>>>>", process.env.MYSQL_HOST);

const PORT = process.env.PORT || 3050;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
