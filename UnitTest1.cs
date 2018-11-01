using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using JUnit.Web;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;


namespace TesteSicredi
{
    [TestClass]
    public class Teste
    {
        public class Compras
        {
            public FirefoxDriver driver;
            public WebDriverWait wait;
           

            [TestInitialize]
            public void Inicializar()
            {

                this.driver = new FirefoxDriver(@"C:\Users\vanessa\Documents\Visual Studio 2012\Projects\TesteSicredi\packages\Firefox.3.6.6");
                this.wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
                driver.Navigate().GoToUrl("http://automationpractice.com/index.php");
            }
             
            [TestMethod]
            public void MetodoCompras()
            {
            driver.Navigate().GoToUrl("http://automationpractice.com/index.php?");
            driver.FindElement(By.Id("group_1")).Click();

            new SelectElement(driver.FindElement(By.Id("group_1"))).SelectByText("M");

            driver.FindElement(By.Id("group_1")).Click();
            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='M'])[1]/following::span[1]")).Click();

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='$28.00'])[2]/following::span[3]")).Click();

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='$26.00'])[6]/following::span[1]")).Click();

            driver.FindElement(By.Id("email_create")).Click();

            driver.FindElement(By.Id("email_create")).Clear();

            driver.FindElement(By.Id("email_create")).SendKeys("vanessateixeira21@live.com");

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='Email address'])[1]/following::span[1]")).Click();

            driver.FindElement(By.Id("id_gender2")).Click();

            driver.FindElement(By.Id("customer_firstname")).Click();

            driver.FindElement(By.Id("customer_firstname")).Clear();

            driver.FindElement(By.Id("customer_firstname")).SendKeys("Vanesa");

            driver.FindElement(By.Id("customer_lastname")).Clear();

            driver.FindElement(By.Id("customer_lastname")).SendKeys("Teixeira");

            driver.FindElement(By.Id("passwd")).Clear();

            driver.FindElement(By.Id("passwd")).SendKeys("sicredi");

            driver.FindElement(By.Id("days")).Click();

            new SelectElement(driver.FindElement(By.Id("days"))).SelectByText("regexp:04\\s+");

            driver.FindElement(By.Id("days")).Click();

            driver.FindElement(By.Id("months")).Click();

            new SelectElement(driver.FindElement(By.Id("months"))).SelectByText("regexp:November\\s");

            driver.FindElement(By.Id("months")).Click();

            driver.FindElement(By.Id("years")).Click();

            new SelectElement(driver.FindElement(By.Id("years"))).SelectByText("regexp:1989\\s+");

            driver.FindElement(By.Id("years")).Click();

            driver.FindElement(By.Id("address1")).Clear();

            driver.FindElement(By.Id("address1")).SendKeys("Umbu");

            driver.FindElement(By.Id("city")).Click();

            driver.FindElement(By.Id("city")).Clear();

            driver.FindElement(By.Id("city")).SendKeys("Porto Alegre");

            driver.FindElement(By.Id("id_state")).Click();

            new SelectElement(driver.FindElement(By.Id("id_state"))).SelectByText("Washington");

            driver.FindElement(By.Id("id_state")).Click();

            driver.FindElement(By.Id("postcode")).Click();

            driver.FindElement(By.Id("postcode")).Clear();

            driver.FindElement(By.Id("postcode")).SendKeys("42556");

            driver.FindElement(By.Id("other")).Click();

            driver.FindElement(By.Id("other")).Clear();

            driver.FindElement(By.Id("other")).SendKeys("teste");

            driver.FindElement(By.Id("phone_mobile")).Click();

            driver.FindElement(By.Id("phone_mobile")).Clear();

            driver.FindElement(By.Id("phone_mobile")).SendKeys("51991765623");

            driver.FindElement(By.Id("alias")).Click();

            driver.FindElement(By.Id("alias")).Clear();

            driver.FindElement(By.Id("alias")).SendKeys("casa");

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='DNI / NIF / NIE'])[1]/following::span[1]")).Click();

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='If you would like to add a comment about your order, please write it in the field below.'])[1]/following::span[1]")).Click();

            driver.FindElement(By.Id("cgv")).Click();

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='(Read the Terms of Service)'])[1]/following::span[1]")).Click();

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='(order processing will be longer)'])[1]/following::span[1]")).Click();

            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='Dollar'])[1]/following::span[1]")).Click();

            driver.FindElement(By.LinkText("Back to orders")).Click();
        }

            }
        IAlert waitForAlert()
        {
            int tentativas = 5;
            while (tentativas > 0)
            {
                try
                {
                    tentativas++;
                    var alerta = driver.SwitchTo().Alert();
                    return alerta;
                }
                catch (NoAlertPresentException)
                {
                    Thread.Sleep(500);
                    continue;
                }
            }
            return null;
          }
        }
    }
}


            
    

