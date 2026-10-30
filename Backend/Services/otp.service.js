const otpModel = require('../Models/otp.model');
const User = require('../Models/user.model');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const jsonWebToken = require('jsonwebtoken');

const create = async ( data )=>{
    try {
        const { email } = data;

        const user = await User.findOne( { email });
        if(!user){
            throw {
                err: 'User not found!',
                message: ' No user is registered with this email! Try creating account first',
                code: 404
            }
        }

        const generateOTP = () => {
            return otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
        };

        const sendOTP = async ( email, otp ) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: `${process.env.EMAIL_USER}`,
                    pass: `${process.env.EMAIL_PASSCODE}`,
                }
            });

            await transporter.sendMail({
                from: `${process.env.EMAIL_USER}`,
                to: email,
                subject: otp,
                text: `Welcome back ${user.name} login to your account with this OTP. Your otp is ${otp}`
            });
        };

        // const otp = generateOTP();
        // const response = await otpModel.create({
        //     email,
        //     otp,
        //     expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
        // });

        const otp = generateOTP();

const response = await otpModel.findOneAndUpdate(
    { email },
    {
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
    {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
    }
);
        await sendOTP( email, otp);

        return response;
 
    } catch (err) {
        console.log(err);

        throw err;
        
    }
};

const verify = async ( data )=> {
    const { email, otp } = data;
    try {

        const response = await otpModel.findOne( { email, otp });
        if(!response){
            throw {
                err: 'Not a valid OTP or OTP expired',
                message: 'Generate a new otp.',
                code: 400
            }
        }

        const isExpired = Date.now() - response.createdAt > 5 * 60 * 1000;

        if (isExpired) {
            await otpModel.deleteOne({ email });
            throw {
                err: 'OTP expired.',
                message: 'Generate a new otp.',
                code: 400
            }
        }

        const token = jsonWebToken.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1d'}

        );
        const user = await User.findOne( { email });
        await otpModel.findOneAndDelete( { email, otp});

        return {
            user: user,
            token: token
        }

        
    } catch (err) {
        console.log(err);
        await otpModel.findOneAndDelete( { email, otp});
        throw err;
    }
}

module.exports = {
    create,
    verify
}