# Список артефактов для находок, наград и квестов

## Артефакты для выживания
```json
    {
        "Form": "Маленький куб из металла и синта с металлическими ручками и инструментами.",
        "Depletion": "1 in 1d100 (per day of use)",
        "Name": "Automated Cook",
        "NameRu": "Автоматизированный повар",
        "Level": "1d6",
        "Effect": "Этот автоматон готовит пищу по команде. Ему необходимо давать сырьё (воду и органические соединения), но с его помощью можно приготовить и подать горячее, питательное, вкусное блюдо. Позволяет готовить любое количество мер еды за один период суток.",
        "Categories": "Automatons",
        "Source": "Discovery"
    },
    {
        "Form": "Трубка из синта",
        "Depletion": "1 in 1d10",
        "Name": "Food Tube",
        "NameRu": "Пищевая трубка",
        "Level": "1d6",
        "Effect": "Собирает из окружающего пространства питательные вещества и производит серую пасту, которая обеспечивает достаточное питание для {одного человека|двух человек} в течение одного дня.",
        "Categories": "Utility",
        "Source": "Discovery"
    },
    {
        "Form": "Портативное устройство с несколькими элементами управления и широкой тарелкой на одном конце",
        "Depletion": "1 in 1d20",
        "Name": "Food Scanner",
        "NameRu": "Пищевой сканер",
        "Level": "1d6",
        "Effect": "При включении и наведении на пищу это устройство подаёт звуковой сигнал, если в пище есть какие-либо загрязняющие или ядовитые вещества.",
        "Categories": "Utility",
        "Source": "Discovery"
    },
    {
        "Form": "Прозрачный стакан для питья",
        "Depletion": "—",
        "Name": "Telltale Glass",
        "NameRu": "Контрольный стакан",
        "Level": "1",
        "Effect": "Становится красным, если в него положить что-нибудь ядовитое, даже в очень небольших количествах.",
        "Categories": "Protection (General)",
        "Source": "Discovery"
    },
    {
        "Form": "Длинная и тонкая трубка из синта",
        "Depletion": "—",
        "Name": "Filtration Straw",
        "NameRu": "Фильтрующая соломинка",
        "Level": "1d6 + 4",
        "Effect": "Вода, проходящая через эту трубку, очищается. Большинство жидкостей, кроме воды, всасываемых через трубку, выходят в виде воды (или в основном воды). Артефакт нейтрализует яды, болезни и другие загрязнения силой ниже [DeviceLevel].",
        "Categories": "Utility",
        "Source": "Discovery"
    },
```

## Крутые артефакты (оверкилл)
```json
    {
        "Form": "Металлический сундук с гусеничными колесами по обе стороны.",
        "Depletion": "1 in 1d20",
        "Name": "Carryall",
        "NameRu": "Сундук",
        "Level": "1d6",
        "Effect": "Это устройство сопровождается небольшим модулем, который можно носить на поясе. Катясь на гусеницах, сундук пытается оставаться в шаговой доступности от модуля (хотя его можно настроить так, чтобы он оставался на месте). Каждый раунд он перемещается на близкую дистанцию. Сундук может приехать к модулю с расстояния до {15|30} километров. Внутренняя часть сундука в основном полая и может вместить до 1000 килограмм. Артефакт должен быть активирован заново каждый день.",
        "Categories": "Utility",
        "Source": "Discovery"
    },
```

## Защитные артефакты
```json
    {
        "Form": "Браслет или нарукавная повязка с небольшим металлическим устройством.",
        "Depletion": "1 in 1d20",
        "Name": "Kinetic Shield",
        "NameRu": "Кинетический щит",
        "Level": "1d6 + 1",
        "Effect": "Когда физический снаряд, такой как стрела, метательный нож или похожий на пулю снаряд, проходит в пределах 10 сантиметров от тела владельца, автоматически активируется мощное энергетическое поле, которое пытается замедлить или отклонить снаряд. Проверка уклонения от такой атаки получает {+2|+3}. Если снаряд всё же попадает во владельца, поле добавляет 2 пункта брони против этой атаки.",
        "Categories": "Magnetic Devices, Protection (General)",
        "Source": "Discovery"
    },
    {
        "Form": "Парящая в воздухе 10 сантиметровая серебристая сфера",
        "Depletion": "1 in 1d20",
        "Name": "Vuechi",
        "NameRu": "Вуечи",
        "Level": "1d6 + 1",
        "Effect": "После активации это устройство следует в пределах 1 метра от пользователя и атакует всё, что атакует пользователя, пусть и только в шаговой доступности. Вуечи атакует разрядом электричества (в пределах шаговой доступности), который производит атаку силой [DeviceLevel x 2] (урон 1, энергия). Только одна такая атака может быть в течение одного раунда. После активации он работает в течение 28 часов.",
        "Categories": "Weapons (Melee), Weapons (Ranged)",
        "Source": "Discovery"
    }
```

### Для Томаса
```json
    {
        "Form": "Меч или аналогичное холодное оружие с устройствами, прикреплёнными к лезвию и рукояти.",
        "Depletion": "1 in 1d6",
        "Name": "Disruption Blade",
        "NameRu": "Разрушающий клинок",
        "Level": "1d6 + 1",
        "Effect": "Оружие функционирует как обычный длинный меч. Однако, если владелец использует стандартное действие для его активации, то в течение следующего раунда оружие начинает излучать поле разрушающей молекулы энергии. Если в течении этого раунда владелец попадает по противнику, оружие наносит дополнительные {3|4} очков урона.",
        "Categories": "Weapons (Melee)",
        "Source": "Discovery"
    },
    {
        "Form": "Типичный меч со странно выглядящей рукоятью из синта",
        "Depletion": "1 in 1d10 (для способности лечения, но после истощения он всё ещё работает как меч)",
        "Name": "Healing Sword",
        "NameRu": "Исцеляющий меч",
        "Level": "1d6",
        "Effect": "Этот длинный меч – это выкованное в Девятом мире дополнение к рукояти (которая, вероятно, изначально не была рукоятью меча). При правильном сжатии рукоять впрыскивает целебное вещество в тело владельца, восстанавливая 1 пункт Здоровья. Если владелец использует меч в бою, использование функции исцеления не требует каких-либо действий, но может быть использовано только раз в раунд.",
        "Categories": "Healing Devices, Weapons (Melee)",
        "Source": "Discovery"
    },
    {
        "Form": "Прозрачный щит из синта",
        "Depletion": "—",
        "Name": "Analyzing Shield",
        "NameRu": "Анализирующий щит",
        "Level": "1d6",
        "Effect": "Носитель может видеть сквозь этот щит, кроме того, в нём есть дисплей, который анализирует лучшее место для удара по врагу, на которого направлен. Щит работает как обычный лёгкий щит с модификатором {+2|+3}. Но его носитель может увеличить ментальную усталость на 1 пункт для увеличения урона от атаки на 1 пункт. Выбор должен быть сделан до броска атаки.",
        "Categories": "Protection (General)",
        "Source": "Discovery"
    },
```

### Для Гура
```json
    {
        "Form": "Очень тонкая, лёгкая и прозрачная ткань, сформированная в грубый плащ",
        "Depletion": "1 in 1d100",
        "Name": "Chameleon Cloak",
        "NameRu": "Плащ-хамелеон",
        "Level": "1d6 + 4",
        "Effect": "В течение [DeviceLevel x 10] минут после активации (стандартное действие) принимает цвета и текстуры всего, что находится вокруг владельца, тем самым давая +д10 на проверки Скрытности.",
        "Categories": "Enhancements (Skills), Protection (General)",
        "Source": "Discovery"
    },
```

### Для Мартины
> НазваниеEng: Manybag
Уровень: 3 [1d6]
Форма: Stiff leather bag of fairly large size
Эффект: This leather bag has dozens of sealed compartments of different sizes. By verbal command, portions of the bag can become selectively intangible so that anything in the bag can be accessed quickly. In effect, the user can speak a command word and draw out whatever object in the bag is desired, because all other obstructing compartments (and their contents) are rendered out of phase for a moment.
Истощение: —
Категории: Utility
Источник: Compendium

> НазваниеEng: Liminal Scanner
Уровень: 5 [1d6 + 2]
Форма: A large device that fits over the user’s hand and has a screen, an array of controls, and a long metal tendril that functions as a sensory apparatus
Эффект: This device scans an object or creature within short range and determines a variety of qualities (some quite esoteric) that cannot be observed with the naked eye. This grants the user an asset in dealing with the material in some desired way, chosen by the user. For example, a scanned wall might be easier to break through, a foe might be easier to attack, a device might be easier to understand, and so on. The asset is always specific to the single object or creature and to the single task specified, but it remains indefinitely.
Истощение: 1 in 1d20
Категории: Utility
Источник: Compendium

> НазваниеEng: Energy Converter
Уровень: 5 [1d6] (улучшенный)
Форма: A mechanical plug that must be installed somewhere in the user’s body
Эффект: The device transforms physical energy into mental energy. Whenever the user would apply Effort on an Intellect roll, she may spend the points from her Might Pool instead.
Истощение: 1 in 1d100 (check once each day)
Категории: Utility
Источник: Compendium

> НазваниеEng: Snuffler
Уровень: 8 [1d6 + 2] (улучшенный)
Форма: A 3-foot-tall (1 m) hairless, nearly mindless creature lacking any distinctive features beyond a gaping orifice in its head
Эффект: This is a level 1 creature. It accompanies you and obeys your commands, but it’s not capable of attacking. As a level 1 creature, it has a target number of 3 and 3 health. If you wave something in front of the snuffler’s orifice, the creature inhales and memorizes the scent. It can then unerringly track the scent until it gets a good sniff of something else. If the creature is reduced to 0 health, it is instantly slain.
Истощение: —
Категории: Utility
Источник: Compendium

> НазваниеEng: Data Armor
Уровень: 4 [1d6]
Форма: A tiny metal disk with a glowing crystal in the center
Эффект: When placed just under the ear, tiny prongs sprout from the disk to anchor it in the flesh. The device reinforces the user’s mind with an information stream from the datasphere. The device adds 1 to her Intellect Edge.
Истощение: —
Категории: Datasphere Devices, Enhancements (Intellect)
Источник: Compendium