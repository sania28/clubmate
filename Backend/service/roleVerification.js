const { handleDecodeToken } = require("./jwtTokenGenerateAndDecode");

async function ClubleadVerification(token) {
  const decodeToken = await handleDecodeToken(token);
  const Role = decodeToken.role;
  if (Role == "ClubLead" || Role == "Member" || Role == "Guest") {
    return false;
  }
  return true;
}
async function MemberVerification(token) {
  const decodeToken = await handleDecodeToken(token);
  const Role = decodeToken.role;
  if (Role == "Member" || Role == "Guest") {
    return res.status(404).json({ msg: "Unauthorized" });
  }
  next();
}
async function GuestVerification(token) {
  const decodeToken = await handleDecodeToken(token);
  const Role = decodeToken.role;
  if (Role == "Guest") {
    return res.status(404).json({ msg: "Unauthorized" });
  }
  next();
}
module.exports = {
  ClubleadVerification,
  MemberVerification,
  GuestVerification,
};
