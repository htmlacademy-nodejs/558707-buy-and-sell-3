-- Получить список всех категорий (идентификатор, наименование категории);
SELECT
  categories.id AS "Идентификатор",
  categories.name AS "Наименование категории"
FROM categories;
--

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT
  categories.id AS "Идентификатор",
  categories.name AS "Наименование категории"
FROM categories
INNER JOIN offers_categories
    ON offers_categories.category_id = categories.id
GROUP BY
    categories.id,
    categories.name
HAVING
  count(offers_categories.offer_id) >= 1;
--

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT
    categories.id AS "Идентификатор",
    categories.name AS "Наименование категории",
    count(offers_categories.offer_id) AS "Количество объявлений в категории"
FROM categories
INNER JOIN offers_categories
	ON offers_categories.category_id = categories.id
GROUP BY
    categories.id,
    categories.name;

