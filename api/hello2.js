export default function hello2(req, res) {
  res.statusCode = 200;
  res.json({ message: "It works" });
}
