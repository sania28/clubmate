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
    return false
  }
  return true
}
  
async function GuestVerification(token) {
  const decodeToken = await handleDecodeToken(token);
  const Role = decodeToken.role;
  if (Role == "Guest") {
    return false
  }
  return true
}
module.exports = {
  ClubleadVerification,
  MemberVerification,
  GuestVerification,
};
