const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require("assert");

describe('First script', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    // it('First Selenium script with mocha', async function () {
    //     await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    //     let title = await driver.getTitle();
    //     assert.equal("Web form", title);

    //     await driver.manage().setTimeouts({ implicit: 500 });

    //     let textBox = await driver.findElement(By.name('my-text'));
    //     let submitButton = await driver.findElement(By.css('button'));

    //     await textBox.sendKeys('Selenium');
    //     await submitButton.click();

    //     let message = await driver.findElement(By.id('message'));
    //     let value = await message.getText();
    //     assert.equal("Received!", value);
    // });

    it('Acessando conta como usuário comum', async function () {
        await driver.get('https://www.saucedemo.com/');

        let cpf = await driver.findElement(By.id('user-name'));
        let senha = await driver.findElement(By.id('password'));
        let submit = await driver.findElement(By.id('login-button'));

        await cpf.sendKeys('standard_user');
        await senha.sendKeys('secret_sauce');
        await submit.click();
        
        let currentUrl = await driver.getCurrentUrl();

        assert.equal('https://www.saucedemo.com/inventory.html', currentUrl);  
    });

    it('Colocando itens no carrinho', async function() {

        let comprarItem = await driver.findElement(By.className('btn_small'));
        let carrinho = await driver.findElement(By.className('shopping_cart_link'));

        await comprarItem.click();
        await carrinho.click();

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('https://www.saucedemo.com/cart.html', currentUrl);  
    });

    it('Submit Carrinho', async function() {
        let checkout = await driver.findElement(By.id('checkout'));
        await checkout.click();

        
    });

    it('Completando formulario', async function() {
        let primeiroNome = await driver.findElement(By.id('first-name'));
        let ultimoNome = await driver.findElement(By.id('last-name'));
        let cep = await driver.findElement(By.id('postal-code'));
        let submit = await driver.findElement(By.id('continue'));

        await primeiroNome.sendKeys('standard_user');
        await ultimoNome.sendKeys('secret_sauce');
        await cep.sendKeys('123456');

        await submit.click();

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('https://www.saucedemo.com/checkout-step-two.html', currentUrl);
    });

    it('Finalizar compra', async function() {
        let submit = await driver.findElement(By.id('finish'));
        await submit.click();

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('https://www.saucedemo.com/checkout-complete.html', currentUrl);
    });
    
    it('Voltar para Home', async function() {
        let submit = await driver.findElement(By.id('back-to-products'));
        await submit.click();

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('https://www.saucedemo.com/inventory.html', currentUrl);
    });

    it('Sair Conta', async function() {
        let menu = await driver.findElement(By.id('react-burger-menu-btn'));
        let sair = await driver.findElement(By.id('logout_sidebar_link'));
        await menu.click();
        await sair.click();

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('https://www.saucedemo.com', currentUrl);
    });


    after(async () => await driver.quit());
});
