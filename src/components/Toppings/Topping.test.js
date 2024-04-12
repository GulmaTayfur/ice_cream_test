import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("Sosları ekleme ve çıkarma işlemleri toplama etki eder", async () => {
  const user = userEvent.setup();
  //1) Bileşenleri renderle
  render(<Toppings />);

  //2) Toplam spanı al
  const total = screen.getByTestId("total");

  //3) Bütün sos kartlarını al
  const toppings = await screen.findAllByRole("checkbox");

  //4) Toplam ücret 0 mı kontrol et
  expect(total.textContent).toBe("0");

  //5) Bütün checkboxların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());

  //6) Soslardan birine tıkla
  await user.click(toppings[0]);

  //7) total 3'e eşit mi
  expect(total.textContent).toBe("3");

  //8) Soslardan birine daha tıkla
  await user.click(toppings[4]);

  //9) total 6'ya eşit mi
  expect(total.textContent).toBe("6");

  //10) eklenen soslardan birini çıkar
  await user.click(toppings[4]);

  //11) total 3'e eşit mi
  expect(total.textContent).toBe("3");

  //12) eklenen son sosu çıkar
  await user.click(toppings[0]);

  //13) total 0'a eşit mi
  expect(total.textContent).toBe("0");
});
