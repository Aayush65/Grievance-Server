import { Request, Response } from 'express';
import { badRequest, serverError, statusOkay, wrongCredentials } from '../../views/view';
import { compare } from 'bcryptjs';
import AdminModel from '../../models/Admins';
import { encrypt } from '../../utils/hash';


export async function changeAdminPasswordController(req: Request, res: Response) {
    try {
        const { empNo, pass, newPass } = req.body;
        if (!empNo || !pass || !newPass) {
            badRequest(res);
            return;
        }
        const empData = await AdminModel.findOne({empNo: empNo});
        if (!empData || !empData.pass){
            serverError(res, { message: "Admin Not Found" });
            return;
        }
        if (!await compare(pass, empData.pass)) {
            wrongCredentials(res);
            return;
        }
        empData.pass = await encrypt(newPass);
        await empData.save();
        statusOkay(res, {message: "Password Updated Successfully"});
    } catch(err) {
        serverError(res, err);
    }
}