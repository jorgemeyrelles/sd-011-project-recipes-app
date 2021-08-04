import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import { mockFilterDrinkByCategory, mockFilterMealByCategory } from '../helper/mockAPI';
import { Foods, Drinks } from '../../pages';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealsFilterByBeef from '../mocks/meals/mockFilterByBeef';
import drinksFilterByOrdinaryDrink from '../mocks/drinks/mockFilterByOrdinaryDrink';
import * as requestMenu from '../../services/requestMenu';

const maxDefaultCards = 12;

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`29 - Implement the filter as a toggle, if selected again, the app should 
return recipes without any filter`, () => {
  it(`If the recipes are for food and the filter has been selected again, the first 12 
  recipes without filter must be returned`, async () => {
    renderWithRouterAndStore(<Foods />, '/comidas');
    mockFilterMealByCategory(mealsFilterByBeef);

    const beefFilterOption = await screen.findByTestId('Beef-category-filter');
    fireEvent.click(beefFilterOption);
    fireEvent.click(beefFilterOption);

    const { meals } = mealsFiltersByAll;
    await testMealsRecipeCard(meals, maxDefaultCards);
  });

  it(`If the recipes are for drinks and the filter has been selected again, the first 12 
  recipes without filter must be returned`, async () => {
    renderWithRouterAndStore(<Drinks />, '/bebidas');
    mockFilterDrinkByCategory(drinksFilterByOrdinaryDrink);

    const ordinaryDrinkFilterOption = await screen.findByTestId(
      'Ordinary Drink-category-filter',
    );
    fireEvent.click(ordinaryDrinkFilterOption);
    fireEvent.click(ordinaryDrinkFilterOption);

    const { drinks } = drinksFiltersByAll;
    await testDrinksRecipeCard(drinks, maxDefaultCards);
  });
});
