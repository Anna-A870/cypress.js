import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
           });     

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); //ввели верный логин
         cy.get(main_page.password).type(data.password); //ввели верный пароль
         cy.get(main_page.login_button).click(); //нажали войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверяю, что вижу текст
         cy.get(result_page.title).should('be.visible'); //текст виден пользователю
     })

     it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); //нажали кнопку забыли пароль
        cy.get(recovery_page.email).type(data.login); //ввели почту для восстановления
        cy.get(recovery_page.send_button).click(); //нажали на кнопку отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        
    })

     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); //ввели верный логин
        cy.get(main_page.password).type('Ndjfjglh'); //ввели неверный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю 
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('fhgjlsh@ya.ru'); //ввели неверный логин
        cy.get(main_page.password).type(data.password); //ввели верный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
    })

    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); //ввели логин без @
        cy.get(main_page.password).type(data.password); //ввели верный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
    })

    it('Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //ввели верный логин с прописными буквами
        cy.get(main_page.password).type(data.password); //ввели верный пароль
        cy.get(main_page.login_button).click(); //нажали войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
    })
 }) 