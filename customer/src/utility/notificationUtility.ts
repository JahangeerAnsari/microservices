// OTP
export const GenerateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expire = new Date();
    expire.setTime(new Date().getTime() + 30 * 60 * 1000); // Add 30 minutes to the current time
    return { otp, expire };
}
// on generate otp
export const onRequestOtp = async (otp: number, toPhoneNumber: string) => {
  const accountSID = "AC1e1e7e44fc2e8a150c64d68b82145b0e";
  const accountToken = "787a437e77672d3aa3bd3e568846020f";
  const clinet = require("twilio")(accountSID, accountToken);
  const response = await clinet.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+1929393939",
    to: `+91${toPhoneNumber}`,
  });
    return response;
};