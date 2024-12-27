import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store.ts';
import { useNavigate } from 'react-router-dom';
import './Description.css';

const seededShuffle = (array, seed) => {
    const shuffled = [...array];
    let currentIndex = shuffled.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor((Math.abs(Math.sin(seed++)) * 10000) % currentIndex);
        currentIndex--;
        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    return shuffled;
};

const Description = () => {
    const [uniqueCatalogs, setUniqueCatalogs] = useState<any[]>([]);
    const catalog = useSelector((state: RootState) => state.catalog.catalogs || []);
    const navigate = useNavigate();

    useEffect(() => {
        if (!catalog || catalog.length === 0) return;

        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        const shuffledCategories = seededShuffle(catalog, seed);
        setUniqueCatalogs(shuffledCategories.slice(0, 6));
    }, [catalog]);

    return (
        <div className="grid-container">
            <div className="content">
                <h2>Ми Air Space Logic</h2>
                <p>
                    AirSpaceLogic.com – інтернет-магазин квадрокоптерів, їх комплектуючих та аксесуарів. Ми пропонуємо великий асортимент продукції для любителів і професіоналів у галузі дронів.
                </p>

                <h3>Що ми пропонуємо?</h3>
                <p>
                    У нашому інтернет-магазині ви знайдете широкий вибір квадрокоптерів різних моделей, від початкового рівня до професійних, що задовольнять потреби будь-якого клієнта. Ми також пропонуємо ряд комплектуючих, включаючи контролери польоту, батареї, пропелери, антени та кабелі і ряд іншого обладнання.
                </p>

                <h3>Наша мета</h3>
                <p>
                    Забезпечити вас якісною продукцією, яка відповідає найвищим стандартам безпеки та функціональності. Ми працюємо тільки з надійними виробниками та постачальниками.
                </p>

                <h3>Продукція</h3>
                <p>
                    Військові операції часто проходять в умовах, далекіх від ідеальних. Дощ, сніг, постійні обстріли чи туман можуть суттєво ускладнити виконання завдань, але у нас є рішення. Там, де не видно, наші дрони побачать; де не чутно, наші засоби РЕБ почують і спрацюють; а там, де не дістати, наш ретранслятор підсилить звʼязок.
                </p>
                <p>
                    Ми раді представити вам широкий асортимент наших помічників, готових підтримати вас у будь-яких умовах:
                </p>
                <ul>
                    {uniqueCatalogs.map((cat) => (
                        <li key={cat._id}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/catalog/${cat.name}`);
                                }}
                            >
                                {cat.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <p>Наші вироби завжди готові прийти на допомогу.</p>

                <h3> </h3>
                <p>
                    У сучасних бойових умовах, коли кожна хвилина на рахунку, технології стають вирішальним фактором успіху. Наші квадрокоптери забезпечують відеоспостереження та виконують розвідувальні місії в умовах низької видимості.
                </p>
                <p>
                    Засоби радіоелектронної боротьби (РЕБ) забезпечують надійний захист від ворожих дій, тоді як наші ретранслятори гарантують стабільний зв’язок у найскладніших умовах.
                </p>
                <p>
                    Кожен з наших продуктів розроблений з урахуванням специфіки військових завдань та потреб сучасного бойового середовища.
                </p>
                <p>
                    Обирайте надійність, обирайте технології, що працюють!
                </p>
            </div>
        </div>
    );
};

export default Description;
