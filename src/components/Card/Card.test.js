import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
};
// Prop olarak veri alan bir bileşeni test ediyorsak
// Aldığı propların benzerini göndermemiz lazım
test("Miktar, başlık ve fotoğraf gelen veriye göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // miktar spanını çağır
  const amount = screen.getByTestId("amount");

  // miktar 5 mi kontrol et
  expect(amount.textContent).toBe("5");

  // chocolate yazısı ekrana basıldı mı?
  screen.getByText("Chocolate");

  // resim elementini al
  const image = screen.getByAltText("çeşit-resim");

  // src değeri "/images/chocolate/.png" olan resim var mı?
  expect(image).toHaveAttribute("src", item.imagePath);
});

//
test("Butonlara tıklanınca fonksiyonlar doğru parametrelerle çalışır", async () => {
  const user = userEvent.setup();
  // prop olarak scoops bileşeninden gönderilen orjinal fonksiyonları gönderemeyeceğimizden fonksiyonları doğru şekilde doğru zamanda doğru parametrelerle çalışıyor mu kontrolünü yapabilmek için fonksiyonu taklit eden mock fonksiyonu tanımlamak gerekir

  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();

  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  // Butonları al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const clearBtn = screen.getByRole("button", { name: /sıfırla/i });

  // Ekle butonuna tıkla
  await user.click(addBtn);

  // addToBasket fonksiyonu doğru parametrreleri alarak çalıştı mı?
  expect(addMockFn).toHaveBeenCalledWith(item);

  // sıfırla butonuna tıkla
  await user.click(clearBtn);

  // clearFromBasket fonksiyonu doğru parametrreleri alarak çalıştı mı?
  expect(clearMockFn).toHaveBeenCalledWith("Chocolate");
});
