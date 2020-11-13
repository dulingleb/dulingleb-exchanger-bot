-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 11 2020 г., 13:15
-- Версия сервера: 8.0.19
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dulingleb_bot`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bank_details`
--

CREATE TABLE `bank_details` (
  `id` bigint UNSIGNED NOT NULL,
  `exchanger_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `bank_details`
--

INSERT INTO `bank_details` (`id`, `exchanger_id`, `title`, `text`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Решение', 'Банк Решение. Номер договора: 00860933000490/6331\r\nНомер карты: 5257 1425 0001 6331 (01/23)\r\n\r\nИнструкция для оплаты через ЕРИП:\r\n1) Система \"Расчет\" (ЕРИП)\r\n2) Банковские, финансовые услуги\r\n3) Банки, НКФО\r\n4) Банк Решение\r\n5) Пополнение карты (онлайн)\r\n6) Указываете номер договора: 00860933000490/6331 (Выдаст: пополняемая карточка 525714*******6331)\r\n7) Сумма', 1, '2020-10-09 10:43:53', '2020-10-12 19:38:35', NULL),
(3, 1, 'Белгаз', 'реквизиты белгаз\r\n32432', 0, '2020-10-09 17:46:13', '2020-10-12 19:38:39', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `exchangers`
--

CREATE TABLE `exchangers` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `telegram_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coinbase_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coinbase_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course` decimal(10,2) UNSIGNED NOT NULL DEFAULT '30000.00',
  `main_menu_links` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `min_exchange` decimal(10,8) UNSIGNED NOT NULL DEFAULT '0.00100000',
  `max_exchange` decimal(10,8) UNSIGNED NOT NULL DEFAULT '0.10000000',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `exchangers`
--

INSERT INTO `exchangers` (`id`, `user_id`, `status`, `telegram_token`, `coinbase_key`, `coinbase_secret`, `course`, `main_menu_links`, `min_exchange`, `max_exchange`, `created_at`, `updated_at`) VALUES
(1, 1, 0, '1298121504:AAGo5ZoEMXnD__Zev41lggndZourCWmsbms', 'TYdzYLSiq9Rt3xvc', 'RA6jxHTXQF53GO9ohi9vHIDttArr3WdI', '31000.00', NULL, '0.00100000', '0.10000000', NULL, '2020-11-06 11:36:30'),
(2, 3, 0, '1043264838:AAGL7cEFiyMtHTZE9GSP7VRAT64VFZKqFKI', NULL, NULL, '30000.00', NULL, '0.00100000', '0.10000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `exchanger_commissions`
--

CREATE TABLE `exchanger_commissions` (
  `id` bigint UNSIGNED NOT NULL,
  `exchanger_id` bigint UNSIGNED NOT NULL,
  `from` decimal(5,4) UNSIGNED NOT NULL,
  `to` decimal(5,4) UNSIGNED NOT NULL,
  `percent` double(3,1) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `exchanger_commissions`
--

INSERT INTO `exchanger_commissions` (`id`, `exchanger_id`, `from`, `to`, `percent`, `created_at`, `updated_at`) VALUES
(1, 1, '0.0010', '0.0030', 5.0, '2020-10-03 14:52:38', '2020-10-05 18:53:11');

-- --------------------------------------------------------

--
-- Структура таблицы `exchanger_default_messages`
--

CREATE TABLE `exchanger_default_messages` (
  `id` bigint UNSIGNED NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `exchanger_default_messages`
--

INSERT INTO `exchanger_default_messages` (`id`, `text`, `description`, `title`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Добро пожаловать в бот, где вы можете купить <strong>BTC</strong>!', NULL, 'Стартовое сообщение', 'start', '2020-09-26 09:25:17', '2020-09-26 09:25:17'),
(2, 'Введите сумму, которую хотите приобрести.<br><br><em>От <strong>{min_btc} btc</strong> до <strong>{max_btc} btc</strong></em><br><em>От <strong>{min_rub} руб</strong> до <strong>{max_rub} руб</strong></em>', '{min_btc} - минимальная сумма покупки в битках<br>\r\n{max_btc} - максимальная сумма покупки в битках<br>\r\n{min_rub} - минимальная сумма покупки в рублях<br>\r\n{max_rub} - максимальная сумма покупки в рублях', 'Ввод суммы', 'enter-sum', '2020-09-26 09:26:46', '2020-09-29 19:33:30'),
(3, 'Вы ввели неверную сумму покупки.<br><br>\r\n<pre><code>От <strong>{min_btc} btc</strong> до <strong>{max_btc} btc</strong></code><br><code>От <strong>{min_rub} руб</strong> до <strong>{max_rub} руб</strong></code></pre>\r\n<strong><br><br></strong>Попробуйте ввести еще раз:', '{min_btc} - минимальная сумма покупки в битках<br>\r\n{max_btc} - максимальная сумма покупки в битках<br>\r\n{min_rub} - минимальная сумма покупки в рублях<br>\r\n{max_rub} - максимальная сумма покупки в рублях', 'Неверно введена сумма', 'incorrect-sum', '2020-10-05 07:45:45', '2020-10-05 08:52:43'),
(4, 'За <strong>{amount} руб.</strong> вы получите <strong>{price}</strong> биткоинов.<br><br>Введите адрес кошелька:', '{amount} - Введенная пользователем сумма в рублях<br>\r\n{price} - Сколько это получится в биткоинах', 'Стоимость в биткоинах', 'price-in-btc', '2020-10-05 13:27:19', '2020-10-05 13:31:33'),
(5, 'За <strong>{amount} btc</strong> вы должны оплатить <strong>{price} руб.</strong><br><br>Введите адрес кошелька:', '{amount} - Введенная пользователем сумма в битках<br>\r\n{price} - Сколько это получится в рублях', 'Стоимость в рублях', 'price-in-rub', '2020-10-05 18:43:32', '2020-10-05 18:45:43'),
(6, 'У вас будет ровно <strong>1 час</strong> чтобы оплатить заявку. По истечении 60 минут, сделка автоматически удаляется.<br><br>Вы желаете продолжить?', NULL, 'Подтверждение на открытие сделки', 'open-order', '2020-10-08 12:32:25', '2020-10-08 12:32:25'),
(7, 'У вас есть ровно <strong>1 час</strong> чтобы оплатить эту сделку, после чего она автоматически отменится.<br><br>Оплатите <strong>{price} руб.</strong> на реквизиты:\r\n<pre>{bank_details}</pre>', '{bank_details} - реквизиты<br>\r\n{price} - сколько оплатить', 'Предоставление реквизитов', 'bank-details', '2020-10-12 12:23:59', '2020-10-12 12:24:31'),
(8, 'По вашей сделке #{id} возникли дополнительные вопросы. Обратитесь пожалуйста к оператору @GD_BTC', '{id} - номер сделки', 'Направить к оператору', 'direct-to-operator', '2020-10-30 17:06:55', '2020-10-30 17:06:55'),
(9, 'Ваша сделка <strong>#{id}</strong> была отменена. За дополнительной информацией обратитесь к оператору @GD_BTC', '{id} - номер сделки', 'Оператор отменил сделку', 'operation-canceled-by-moderator', '2020-10-30 18:15:35', '2020-10-30 18:15:35'),
(10, 'Ваша операция <strong>№{id}</strong> успешно проверена. Биткоины отправлены на ваш кошелек. <br>Отследить операцию вы можете по ссылке: {link}<br>', '{id} - номер операции<br>\r\n{link} - ссылка на блокчейн', 'Биткоины успешно отправлены', 'operation-success', '2020-11-06 13:54:25', '2020-11-06 13:54:25'),
(11, 'Вы были заблокированы в боте за подозрительные действия. За подробностями обратитесь к оператору.', NULL, 'Бан', 'ban', '2020-11-07 18:27:48', '2020-11-07 18:27:48');

-- --------------------------------------------------------

--
-- Структура таблицы `exchanger_messages`
--

CREATE TABLE `exchanger_messages` (
  `id` bigint UNSIGNED NOT NULL,
  `exchanger_id` bigint UNSIGNED NOT NULL,
  `exchanger_default_message_id` bigint UNSIGNED NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `exchanger_messages`
--

INSERT INTO `exchanger_messages` (`id`, `exchanger_id`, `exchanger_default_message_id`, `text`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 'Добро пожаловать в бот, где вы можете купить <strong>BTC</strong>!', '2020-10-09 08:48:26', '2020-10-09 08:48:26');

-- --------------------------------------------------------

--
-- Структура таблицы `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2020_09_09_192013_create_exchangers_table', 2),
(7, '2020_09_12_182354_create_telegram_users_table', 3),
(8, '2020_09_12_184414_create_telegram_user_settings_table', 3),
(10, '2020_09_24_204342_create_exchanger_default_messages_table', 4),
(11, '2020_09_26_120739_create_exchanger_messages_table', 4),
(12, '2020_10_02_211248_create_exchanger_commissions_table', 5),
(15, '2020_10_09_114342_create_bank_details_table', 6),
(16, '2020_10_09_120404_create_operations_table', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `operations`
--

CREATE TABLE `operations` (
  `id` bigint UNSIGNED NOT NULL,
  `exchanger_id` bigint UNSIGNED NOT NULL,
  `telegram_user_id` bigint UNSIGNED NOT NULL,
  `bank_detail_id` bigint UNSIGNED DEFAULT NULL,
  `amount` decimal(8,6) UNSIGNED NOT NULL,
  `price` decimal(10,2) UNSIGNED NOT NULL,
  `btc_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint UNSIGNED NOT NULL DEFAULT '1',
  `error` text COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `link_transaction` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `operations`
--

INSERT INTO `operations` (`id`, `exchanger_id`, `telegram_user_id`, `bank_detail_id`, `amount`, `price`, `btc_address`, `status`, `error`, `comment`, `link_transaction`, `message_id`, `created_at`, `updated_at`) VALUES
(2, 1, 1038756197, 3, '0.003230', '100.00', '34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU', 6, NULL, NULL, NULL, 333, '2020-10-12 19:04:26', '2020-10-12 19:15:41'),
(3, 1, 1038756197, 3, '0.003230', '100.00', '34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU', 6, NULL, NULL, NULL, 343, '2020-10-12 19:18:24', '2020-10-12 19:18:47'),
(4, 1, 1038756197, 3, '0.003230', '100.00', '34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU', 6, NULL, NULL, NULL, 347, '2020-10-12 19:33:46', '2020-10-12 19:36:28'),
(5, 1, 1038756197, 3, '0.003230', '100.00', '34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU', 6, NULL, NULL, NULL, 351, '2020-10-12 19:36:59', '2020-10-12 19:38:44'),
(6, 1, 1038756197, 1, '0.003230', '100.00', '34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU', 6, NULL, NULL, NULL, 355, '2020-10-12 19:38:54', '2020-10-28 13:42:11'),
(7, 1, 667908511, 1, '0.010000', '310.00', '3AKPySpRVxDuVquyRPntjm9gDpWjXy5Lb5', 6, NULL, NULL, NULL, 361, '2020-10-15 18:05:48', '2020-10-28 13:42:11'),
(8, 1, 394756132, 1, '0.003230', '100.00', '3QWaGekXE5y828EBcYjE5idCqto2gbnFip', 6, NULL, NULL, NULL, 373, '2020-10-26 11:41:47', '2020-10-28 16:45:01'),
(10, 2, 1038756197, NULL, '0.003330', '100.00', '3LryEgRP1EARkiVgP7THFjyLntA1wCF1cH', 6, NULL, NULL, NULL, 19, '2020-10-27 17:28:36', '2020-10-28 17:29:01'),
(11, 2, 394756132, NULL, '0.003330', '100.00', '3HfQXgHJLQRinMB5PhQL9HnHdNUVjAX1oK', 6, NULL, NULL, NULL, 26, '2020-10-29 07:14:55', '2020-10-29 07:28:42'),
(12, 2, 394756132, NULL, '0.003330', '100.00', '3HfQXgHJLQRinMB5PhQL9HnHdNUVjAX1oK', 6, NULL, NULL, NULL, 30, '2020-10-29 07:35:35', '2020-10-29 08:36:01'),
(13, 2, 667908511, NULL, '0.001000', '30.00', '3Mv38dkNdfaZC4KpDqg71JBjbx3aC9Bvnm', 6, NULL, NULL, NULL, 35, '2020-10-29 08:40:35', '2020-10-29 08:42:35'),
(14, 2, 667908511, NULL, '0.010000', '300.00', '3Mv38dkNdfaZC4KpDqg71JBjbx3aC9Bvnm', 6, NULL, NULL, NULL, 40, '2020-10-29 08:42:59', '2020-10-29 08:46:48'),
(15, 2, 667908511, NULL, '0.001670', '50.00', '3Mv38dkNdfaZC4KpDqg71JBjbx3aC9Bvnm', 6, NULL, NULL, NULL, 44, '2020-10-29 08:48:06', '2020-10-29 09:51:36'),
(16, 2, 394756132, NULL, '0.003330', '100.00', '3HfQXgHJLQRinMB5PhQL9HnHdNUVjAX1oK', 6, NULL, NULL, NULL, 52, '2020-10-29 11:33:23', '2020-10-29 12:52:01'),
(17, 1, 394756132, 1, '0.003230', '100.00', '3QWaGekXE5y828EBcYjE5idCqto2gbnFip', 6, NULL, NULL, NULL, 390, '2020-10-29 13:00:35', '2020-10-29 14:01:01'),
(18, 1, 394756132, 1, '0.003230', '100.00', '3QWaGekXE5y828EBcYjE5idCqto2gbnFip', 6, NULL, NULL, NULL, 399, '2020-10-29 16:28:54', '2020-10-29 17:29:01'),
(19, 1, 394756132, 1, '0.009680', '300.00', '3QWaGekXE5y828EBcYjE5idCqto2gbnFip', 6, NULL, NULL, NULL, 430, '2020-10-29 17:33:24', '2020-10-29 18:34:01'),
(20, 1, 394756132, 1, '0.003230', '100.00', '3QWaGekXE5y828EBcYjE5idCqto2gbnFip', 6, NULL, 'asdf', NULL, 438, '2020-10-30 10:08:24', '2020-10-30 18:17:13'),
(21, 1, 394756132, 1, '0.003230', '100.00', '3QWaGekXE5y828EBcYjE5idCqto2gbnFip', 6, NULL, NULL, NULL, 451, '2020-10-30 18:21:08', '2020-11-06 10:18:37'),
(22, 1, 394756132, 1, '0.001000', '35.00', '3NHYd4JCRigX1fsQygxWpzGvC3Lf4i2Rfg', 2, NULL, NULL, NULL, 463, '2020-11-06 14:03:04', '2020-11-06 14:04:15'),
(23, 1, 394756132, 1, '0.004000', '125.00', '3NHYd4JCRigX1fsQygxWpzGvC3Lf4i2Rfg', 6, NULL, NULL, NULL, 475, '2020-11-08 12:44:58', '2020-11-08 12:46:14'),
(24, 1, 394756132, 1, '0.001000', '35.00', '3NHYd4JCRigX1fsQygxWpzGvC3Lf4i2Rfg', 6, NULL, NULL, NULL, 479, '2020-11-08 14:55:44', '2020-11-08 14:57:13'),
(25, 1, 1038756197, 1, '0.003230', '100.00', '34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU', 5, NULL, NULL, NULL, 524, '2020-11-10 14:12:44', '2020-11-10 14:13:06');

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `telegram_users`
--

CREATE TABLE `telegram_users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_bot` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `telegram_users`
--

INSERT INTO `telegram_users` (`id`, `username`, `first_name`, `last_name`, `language_code`, `is_bot`, `created_at`, `updated_at`) VALUES
(394756132, 'grigorydep', 'Глеб', 'Дулин', 'ru', 0, '2020-10-26 11:02:38', '2020-11-10 15:54:16'),
(667908511, 'Migdal_BTC', 'Migdal_BTC', NULL, 'ru', 0, '2020-10-15 18:04:46', '2020-10-28 17:43:23'),
(1038756197, 'GD_BTC', 'dulingleb', NULL, 'ru', 0, '2020-10-12 18:49:36', '2020-11-10 14:12:29');

-- --------------------------------------------------------

--
-- Структура таблицы `telegram_user_settings`
--

CREATE TABLE `telegram_user_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `telegram_user_id` bigint UNSIGNED NOT NULL,
  `exchanger_id` bigint UNSIGNED NOT NULL,
  `role` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `transaction` text COLLATE utf8mb4_unicode_ci,
  `referer_id` bigint UNSIGNED DEFAULT NULL,
  `discount` decimal(4,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `ban` tinyint(1) NOT NULL DEFAULT '0',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `telegram_user_settings`
--

INSERT INTO `telegram_user_settings` (`id`, `telegram_user_id`, `exchanger_id`, `role`, `transaction`, `referer_id`, `discount`, `ban`, `comment`, `created_at`, `updated_at`) VALUES
(4, 1038756197, 1, 'user', '{\"step\":\"checking\",\"amount\":0.00323,\"price\":100,\"address\":\"34npUgCLVatcC2vYuvgDpNxd9VpyfUggdU\",\"operation_id\":25}', NULL, '0.00', 0, '', '2020-10-12 18:49:36', '2020-11-10 14:13:06'),
(6, 667908511, 1, 'user', '{\"step\":\"confirm_buy_btc\",\"amount\":0.01,\"price\":310,\"address\":\"3AKPySpRVxDuVquyRPntjm9gDpWjXy5Lb5\"}', 8, '0.00', 0, '', '2020-10-15 18:04:47', '2020-10-15 18:05:38'),
(8, 394756132, 1, 'admin', '{\"step\":\"to_operator\",\"id\":\"25\"}', NULL, '1.00', 0, 'asdf', '2020-10-26 11:02:40', '2020-11-10 15:54:28'),
(9, 394756132, 2, 'user', '{\"step\":\"get_check\",\"amount\":0.00333,\"price\":100,\"address\":\"3HfQXgHJLQRinMB5PhQL9HnHdNUVjAX1oK\"}', NULL, '0.00', 0, '', '2020-10-28 17:20:39', '2020-10-29 11:33:25'),
(10, 1038756197, 2, 'user', '{\"step\":\"confirm_buy_btc\",\"amount\":0.00333,\"price\":100,\"address\":\"3LryEgRP1EARkiVgP7THFjyLntA1wCF1cH\"}', NULL, '0.00', 0, '', '2020-10-28 17:27:45', '2020-10-28 17:28:31'),
(11, 667908511, 2, 'user', '{\"step\":\"get_check\",\"amount\":0.00167,\"price\":50,\"address\":\"3Mv38dkNdfaZC4KpDqg71JBjbx3aC9Bvnm\"}', NULL, '0.00', 0, '', '2020-10-28 17:43:23', '2020-10-29 08:50:05');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` bigint NOT NULL DEFAULT '2',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role_id`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin Admin', 'dulingleb@gmail.com', '2020-09-09 11:28:42', '$2y$10$dcB3gllhki9K5Cd2eHZVTetFCLHYgdgrRRq9lWo.Jtgc2gzrN9pK2', 1, 'R7Dud20Zluu5LI6U04GQO1klYeWTwux1PFbZEAEKSaRFVq6RmIGLT5A9o1K2', '2020-09-09 11:28:42', '2020-09-09 11:28:42', NULL),
(2, 'asdf', 'dulingleb1@gmail.com', NULL, '$2y$10$u4DyGgC4lByMeh56tSn4Eu7yqP5sICFQZmRwG0qE7nbhCsB2BsQyW', 2, NULL, '2020-09-09 11:30:53', '2020-09-09 11:45:44', '2020-09-09 11:45:44'),
(3, 'хлеб', 'asdf@asdf.com', NULL, '$2y$10$mlDvmxWYkoKI5QH6fpegfe6qbttmjshQ4aVUFxrz/mk.lZOs20v8u', 2, 'hC84zsUVoy6gjBSmkbABLQLjLoawWI0xRodfw8yhT6AHzrSu0YPIJY1GWrhp', '2020-10-09 11:26:27', '2020-10-09 11:26:27', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_details_exchanger_id_index` (`exchanger_id`);

--
-- Индексы таблицы `exchangers`
--
ALTER TABLE `exchangers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exchangers_user_id_index` (`user_id`);

--
-- Индексы таблицы `exchanger_commissions`
--
ALTER TABLE `exchanger_commissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exchanger_commissions_exchanger_id_index` (`exchanger_id`);

--
-- Индексы таблицы `exchanger_default_messages`
--
ALTER TABLE `exchanger_default_messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `exchanger_messages`
--
ALTER TABLE `exchanger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exchanger_messages_exchanger_id_index` (`exchanger_id`),
  ADD KEY `exchanger_messages_exchanger_default_message_id_index` (`exchanger_default_message_id`);

--
-- Индексы таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `operations_exchanger_id_index` (`exchanger_id`),
  ADD KEY `operations_telegram_user_id_index` (`telegram_user_id`),
  ADD KEY `operations_bank_detail_id_index` (`bank_detail_id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Индексы таблицы `telegram_users`
--
ALTER TABLE `telegram_users`
  ADD UNIQUE KEY `telegram_users_id_unique` (`id`);

--
-- Индексы таблицы `telegram_user_settings`
--
ALTER TABLE `telegram_user_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `telegram_user_settings_exchanger_id_foreign` (`exchanger_id`),
  ADD KEY `telegram_user_settings_telegram_user_id_index` (`telegram_user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `exchangers`
--
ALTER TABLE `exchangers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `exchanger_commissions`
--
ALTER TABLE `exchanger_commissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `exchanger_default_messages`
--
ALTER TABLE `exchanger_default_messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `exchanger_messages`
--
ALTER TABLE `exchanger_messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `operations`
--
ALTER TABLE `operations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `telegram_user_settings`
--
ALTER TABLE `telegram_user_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `bank_details`
--
ALTER TABLE `bank_details`
  ADD CONSTRAINT `bank_details_exchanger_id_foreign` FOREIGN KEY (`exchanger_id`) REFERENCES `exchangers` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `exchanger_commissions`
--
ALTER TABLE `exchanger_commissions`
  ADD CONSTRAINT `exchanger_commissions_exchanger_id_foreign` FOREIGN KEY (`exchanger_id`) REFERENCES `exchangers` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `exchanger_messages`
--
ALTER TABLE `exchanger_messages`
  ADD CONSTRAINT `exchanger_messages_exchanger_default_message_id_foreign` FOREIGN KEY (`exchanger_default_message_id`) REFERENCES `exchanger_default_messages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exchanger_messages_exchanger_id_foreign` FOREIGN KEY (`exchanger_id`) REFERENCES `exchangers` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `operations`
--
ALTER TABLE `operations`
  ADD CONSTRAINT `operations_bank_detail_id_foreign` FOREIGN KEY (`bank_detail_id`) REFERENCES `bank_details` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `operations_exchanger_id_foreign` FOREIGN KEY (`exchanger_id`) REFERENCES `exchangers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `operations_telegram_user_id_foreign` FOREIGN KEY (`telegram_user_id`) REFERENCES `telegram_users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `telegram_user_settings`
--
ALTER TABLE `telegram_user_settings`
  ADD CONSTRAINT `telegram_user_settings_exchanger_id_foreign` FOREIGN KEY (`exchanger_id`) REFERENCES `exchangers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `telegram_user_settings_telegram_user_id_foreign` FOREIGN KEY (`telegram_user_id`) REFERENCES `telegram_users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
