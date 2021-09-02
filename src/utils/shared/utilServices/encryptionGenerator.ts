import bcrypt from 'bcryptjs';

const encryptionGenerator = (value: any) => bcrypt.hash(value, 8);

export default encryptionGenerator;
