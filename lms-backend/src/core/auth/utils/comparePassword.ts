import * as bcrypt from 'bcryptjs';

export async function comparePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
}
