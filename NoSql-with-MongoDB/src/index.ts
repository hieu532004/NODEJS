import { initializeApp } from './app';
import { addUser, addUsers } from './utils/db-helpers';

// Khởi động ứng dụng
(async () => {
    try {
        await initializeApp();

        // Thêm user sau khi khởi động
        const newUser = await addUser({
            name: 'Additional User',
            email: 'additional@example.com',
            age: 40
        });
        console.log('Added user after initialization:', newUser);

    } catch (error) {
        console.error('Failed to initialize app or add data:', error);
        process.exit(1);
    }
})();