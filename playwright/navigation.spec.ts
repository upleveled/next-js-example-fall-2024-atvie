import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'UpLeveled' })).toBeVisible();

  // still valid, but try to use the new Locators
  await expect(page.locator('h1:text("UpLeveled")')).toBeVisible();

  // test if imags are visible
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).first(),
  ).toBeVisible();

  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(1),
  ).toBeVisible();

  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(2),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByRole('link', { name: 'Animals' }).click();
  await page.waitForURL('/animals');

  await expect(page.getByRole('heading', { name: 'My Animals' })).toBeVisible();

  const animals = [
    {
      id: 1,
      firstName: 'Lucia',
      type: 'Cat',
      accessory: 'House',
      birthDate: new Date('2020-06-23'),
    },
    {
      id: 2,
      firstName: 'Bili',
      type: 'Capybaras',
      accessory: 'Car',
      birthDate: new Date('2020-06-23'),
    },
    {
      id: 3,
      firstName: 'Jojo',
      type: 'Dog',
      accessory: 'Bike',
      birthDate: new Date('2020-06-23'),
    },
    {
      id: 4,
      firstName: 'Macca',
      type: 'Elephant',
      accessory: 'Key',
      birthDate: new Date('2020-06-23'),
    },
    {
      id: 5,
      firstName: 'Fro',
      type: 'Duck',
      accessory: 'Motor',
      birthDate: new Date('2020-06-23'),
    },
  ];

  for (const animal of animals) {
    await expect(page.getByTestId(`animal-type-${animal.type}`)).toHaveText(
      animal.firstName,
    );
    await expect(
      page.getByRole('img', { name: animal.firstName }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('/fruits');

  await page.getByRole('link', { name: 'Apple 🍎' }).click();
  await page.waitForURL('/fruits/1');

  await page.getByRole('textbox').fill('This is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('/fruits');

  await expect(
    page.getByRole('heading', { name: 'Fruits Page' }),
  ).toBeVisible();

  await expect(
    page.locator(
      'div:has(a:has-text("Apple")) >> div:has-text("This is a comment")',
    ),
  ).toBeVisible();
});
