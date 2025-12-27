"use strict";

/ @type {import('sequelize-cli').Migration} /;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          title: "Для одного странника",
          description: "1 человек",
          price: 490,
        },
        {
          title: "Для путешествующих вдвоем ",
          description: "2 человека",
          price: 650,
        },
        {
          title: "Для шумной компании",
          description: "Группа до 5 человек",
          price: 890,
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          product_id: "1",
          email: "bob@mail.ru",
          status: "pending",
          access_token: "4wfoivjnrsekdlchberenwm",
        },
        {
          product_id: "3",
          email: "bobik@mail.ru",
          status: "paid",
          access_token: "4q2dwfoivjnrsekdlchberenwm",
        },
        {
          product_id: "2",
          email: "lirewa@mail.ru",
          status: "pending",
          access_token: "4wfoidsevvjnrsekdlchberenwm",
        },
        {
          product_id: "3",
          email: "lids@mail.ru",
          status: "paid",
          access_token: "4vsedwqwfoivjnrsekdlchberenwm",
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
