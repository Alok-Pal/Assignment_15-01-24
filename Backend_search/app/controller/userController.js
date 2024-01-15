import { PrismaClient } from '@prisma/client'
import { checkValidation } from '../helpers/validationhelpers.js';
const prisma = new PrismaClient()



function isValidDateFormat(dateString) {
    const validCharactersRegex = /^[0-9\/]+$/;
    const dateRegex = /^(19|20)\d\d\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

    return validCharactersRegex.test(dateString) && dateRegex.test(dateString);
}

class UserController {
    async createUser(req, res) {
        try {
            checkValidation(req)
            const data = req?.body;
            const birthdate = new Date(data.birthdate)

            const user = await prisma.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    birthdate: birthdate,
                    addresses: {
                        create: [{
                            addressLine1: data.addresses.addressLine1,
                            city: data.addresses.city,
                            pincode: data.addresses.pincode,
                            state: data.addresses.state,
                            type: data.addresses.type,
                            addressLine2: data.addresses.addressLine2,
                        }]
                    }
                }
            });

            res.send({
                status: 200,
                message: "Success",
                data: user,
            });

        } catch (error) {
            console.error(error, "dajnfkndkfnakdn");
            res.send({ status: error.status, message: error.code === 'P2002' ? `This ${error?.meta?.target[0]} is already existed ` : error.message });
        }
    }


    async searchUser(req, res) {
        try {
            const { search, minAge, maxAge, city } = req.query;
            const currentDate = new Date();

            // Here minimum birthdate means :--- ex if user have 25 years of age then the data should have equal to 25 and greater than 25 yrs of age. 
            const minBirthDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
            const formattedMinAge = `${minBirthDate.getFullYear()} / ${(minBirthDate.getMonth() + 1).toString().padStart(2, '0')} /${minBirthDate.getDate().toString().padStart(2, '0')}`;


            // Here maximum birthdate means :--- ex if user have 25 years of age then the data should have equal to 25 and less than 25 yrs of age. 
            const maxBirthDate = new Date(currentDate.getFullYear() - maxAge, currentDate.getMonth(), currentDate.getDate());
            const formattedMaxAge = `${maxBirthDate.getFullYear()}/${(maxBirthDate.getMonth() + 1).toString().padStart(2, '0')}/${maxBirthDate.getDate().toString().padStart(2, '0')}`;


            // All conditions

            const whereConditions = {};

            if (search) {
                whereConditions.OR = [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ];
            }

            if (formattedMinAge || formattedMaxAge || city) {
                whereConditions.AND = {};

                // if (formattedMinAge !== "NaN / NaN /NaN") {
                if (isValidDateFormat(formattedMinAge)) {

                    whereConditions.AND.birthdate = {
                        lte: new Date(formattedMinAge),
                    };
                }

                // if (formattedMaxAge !== "NaN/NaN/NaN") {
                if (isValidDateFormat(formattedMaxAge)) {

                    whereConditions.AND.birthdate = {
                        ...whereConditions.AND.birthdate,
                        gte: new Date(formattedMaxAge),
                    };
                }

                if (city) {
                    whereConditions.AND.addresses = {
                        some: {
                            city: { contains: city, mode: 'insensitive' },
                        },
                    };
                }
            }

            const users = await prisma.user.findMany({
                where: whereConditions,
                include: {
                    addresses: true,
                },
            });



            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async updateUser(req, res) {
        try {
            checkValidation(req)
            const id = Number(req.params.id);
            const data = req?.body;
            const birthdate = new Date(data.birthdate)

            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    birthdate: birthdate,
                    addresses: {
                        create: [{
                            addressLine1: data.addresses.addressLine1,
                            city: data.addresses.city,
                            pincode: data.addresses.pincode,
                            state: data.addresses.state,
                            type: data.addresses.type,
                            addressLine2: data.addresses.addressLine2,
                        }]
                    }
                }
            });

            res.send({
                status: 200,
                message: "Success",
                data: user,
            });

        } catch (error) {
            console.error(error, "dajnfkndkfnakdn");
            res.send({ status: error.status, message: error.code === 'P2002' ? `This ${error?.meta?.target[0]} is already existed ` : error.message });
        }
    }



}

export default new UserController();


