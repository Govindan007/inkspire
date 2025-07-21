require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Make sure this path is correct

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const adminEmail = 'admin@inkspire.com';
    const newPassword = 'admin123';

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne(
      { email: adminEmail, role: 'admin' },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      console.log('❌ No admin user found to reset password.');
    } else {
      console.log(`✅ Admin password reset to '${newPassword}'`);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error resetting admin password:', err.message);
  }
};

resetPassword();