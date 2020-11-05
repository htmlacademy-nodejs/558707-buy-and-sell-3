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


-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;
SELECT
  offers.id AS "Идентификатор объявления",
  offers.title AS "Заголовок объявления",
  offers.price AS "Стоимость",
  types.name AS "Тип объявления",
  offers.description AS "Текст объявления",
  offers.created_at AS "Дата публикации",
  users.name AS "Имя и фамилия автора",
  users.email AS "Контактный email",
  count(offers_comments.comment_id) AS "Количество комментариев",
  string_agg(distinct categories.name, ', ') AS "Наименование категорий"
FROM offers
INNER JOIN types
    ON offers.type_id = types.id
INNER JOIN users_offers
    ON offers.id = users_offers.offer_id
INNER JOIN users
    ON users.id = users_offers.user_id
INNER JOIN offers_comments
    ON offers.id = offers_comments.offer_id
INNER JOIN comments
    ON comments.id = offers_comments.comment_id
INNER JOIN offers_categories
    ON offers.id = offers_categories.offer_id
INNER JOIN categories
    ON categories.id = offers_categories.category_id
GROUP BY
    offers.id,
    offers.title,
    offers.price,
    types.name,
    offers.description,
    offers.created_at,
    users.name,
    users.email
ORDER BY
  offers.created_at DESC;


-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT
  offers.id AS "Идентификатор объявления",
  offers.title AS "Заголовок объявления",
  offers.price AS "Стоимость",
  types.name AS "Тип объявления",
  offers.description AS "Текст объявления",
  offers.created_at AS "Дата публикации",
  users.name AS "Имя и фамилия автора",
  users.email AS "Контактный email",
  count(offers_comments.comment_id) AS "Количество комментариев",
  string_agg(distinct categories.name, ', ') AS "Наименование категорий"
FROM offers
INNER JOIN types
    ON offers.type_id = types.id
INNER JOIN users_offers
    ON offers.id = users_offers.offer_id
INNER JOIN users
    ON users.id = users_offers.user_id
INNER JOIN offers_comments
    ON offers.id = offers_comments.offer_id
INNER JOIN comments
    ON comments.id = offers_comments.comment_id
INNER JOIN offers_categories
    ON offers.id = offers_categories.offer_id
INNER JOIN categories
    ON categories.id = offers_categories.category_id
WHERE offers.id = 1
GROUP BY
    offers.id,
    offers.title,
    offers.price,
    types.name,
    offers.description,
    offers.created_at,
    users.name,
    users.email;


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
    comments.id AS "Идентификатор комментария",
    offers.id AS "Идентификатор объявления",
    users.name AS "Имя и фамилия автора",
    comments.text AS "Текст комментария"
FROM comments
INNER JOIN offers_comments
    ON comments.id = offers_comments.comment_id
INNER JOIN offers
    ON offers.id = offers_comments.offer_id
INNER JOIN users
    ON comments.user_id = users.id
GROUP BY
    comments.id,
    offers.id,
    users.name,
    comments.text
LIMIT 5;


-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
    comments.id AS "Идентификатор комментария",
    offers.id AS "Идентификатор объявления",
    users.name AS "Имя и фамилия автора",
    comments.text AS "Текст комментария"
FROM comments
INNER JOIN offers_comments
    ON comments.id = offers_comments.comment_id
INNER JOIN offers
    ON offers.id = offers_comments.offer_id
INNER JOIN users
    ON comments.user_id = users.id
WHERE offers.id = 1;


-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT
    offers.id AS "Идентификатор объявления",
    offers.title AS "Заголовок объявления",
    offers.announce AS "Анонс объявления",
    offers.created_at AS "Дата публикации",
    offers.description AS "Текст объявления",
    types.name AS "Тип объявления",
    offers.price AS "Стоимость",
    offers.picture AS "Анонс объявления"
FROM offers
INNER JOIN types
    ON offers.type_id = types.id
WHERE types.name = 'buy'
LIMIT 2;


-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers
  set title = 'Уникальное предложение!'
WHERE
  offers.id = 1;


