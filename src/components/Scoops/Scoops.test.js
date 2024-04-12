import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

/*

! Seçiciler > 3 ana parçadan oluşur
? Methot [All] BySeçici
* method > get | find | query

* get > başlangıçta dom'da olan elemenetleri almak için kullanılır | elemeni bulamazsa test failler

* query > get ile benzer çalışır | element bulunamazsa null döndürür ve test devam eder

* find > elementin ne zaman ekrana basılacağı belli değilse kullanılır ( api isteklerinde)

* not : find methodu promise döndürür
* bu yüzden async await ile kullanılmalı 

* eüet methoda all eklersek seçicinin koşuluna uyan bütün elementleri alır
* her zaman dizi şeklinde cevap verir
*/

test("Api'dan gelen veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

  // ekrana basılan resimleri al
  const images = await screen.findAllByAltText("çeşit-resim");

  // gelen resimlerin sayısı 1'den büyük ve ya eşit mi
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme ve sıfırlama işlemleri çalışır", async () => {
  // userevent'in kurulumu
  const user = userEvent.setup();
  // bileşeni ekrana bas
  render(<Scoops />);

  // Bütün ekleme ve sıfırlama butonlarını çağır
  const addButtons = await screen.findAllByRole("button", { name: /ekle/i });
  const delButtons = await screen.findAllByRole("button", { name: /sıfırla/i });

  // Toplam fiyat elementini çağır
  const total = screen.getByTestId("total");

  // Toplam fiyatı 0 mı kontrol et
  expect(total.textContent).toBe("0");

  // Ekle butonlarından birine tıkla
  //   fireEvent.click(addButtons[0]);
  await user.click(addButtons[0]);

  // toplam fiyat 20 mi kontrol et
  expect(total.textContent).toBe("20");

  // ekle butonlarından birine 2 kez tıkla
  await user.dblClick(addButtons[2]);

  // toplam fiyatı 60 mı kontrol et
  expect(total.textContent).toBe("60");

  // ilk ekleneni kontrol et
  await user.click(delButtons[0]);

  // toplam fiyatı 40 mı kontrol et
  expect(total.textContent).toBe("40");

  // sok ekleneni kaldır
  await user.click(delButtons[2]);

  // toplam fiyatı 0 mı kontrol et
  expect(total.textContent).toBe("0");
});
