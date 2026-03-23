'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        title: 'Для одного странника',
        description: '1 человек',
        price: 490,
        image: '/tj9w7oyqA1A8iR3juCQA5hViPUj3AzH8GxbwR6vYgNDOYvHq0sCF1jr1ExKslgtPxJy8gMqsldppDeoimoFyKp3f.jpg',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        title: 'Для путешествующих вдвоем',
        description: '2 человека',
        price: 650,
        image: '178ztHewnyH7plDTsDl7ORC7q2uklgA5K4-a5OCBaIQEFTOSSiXuOKN5a8G86TXuvEtNSHniYeEKj13csdOo3Sht.jpg',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        title: 'Для шумной компании',
        description: 'Группа до 5 человек',
        price: 890,
        image: '/1knou-GCUUP7pGeos-48b2PdepxYREDn5NyX0F1_ib9JjRRt4rEmsL-ZR-zvCxiymXy4n9gEJxuXmGsLpPgOraPZ.jpg',
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('Orders', [
      {
        product_id: 1,
        email: 'bob@mail.ru',
        status: 'pending',
        access_token: '4wfoivjnrsekdlchberenwm',
        createdAt: now,
        updatedAt: now,
      },
      {
        product_id: 3,
        email: 'bobik@mail.ru',
        status: 'paid',
        access_token: '4q2dwfoivjnrsekdlchberenwm',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  },
};