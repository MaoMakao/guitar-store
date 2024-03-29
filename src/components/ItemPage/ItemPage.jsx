import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "../HelperComponents/Slider";
import ToCartButton from "../HelperComponents/ToCartButton";
import styles from "./ItemPage.module.scss";
import { mockedData } from "../../mockedData";

const ItemPage = () => {
    const [item, setItem] = useState();
    const { category, id } = useParams();

    useEffect(() => {
        // (async () => {
        //     const response = await axios.get(
        //         `http://localhost:3001/items?id=${id}`
        //     );
        // })();
        setItem(mockedData.items.find((item) => item.id === id));
    }, [id]);

    return (
        item && (
            <div className={styles.itempage__wrapper}>
                <div className={styles.item__main}>
                    <div className={styles.item__slider}>
                        <Slider images={item.img} sliderWidth={450} sidePanel={true}/>
                    </div>
                    <div className={styles.item__details}>
                        <h2 className={styles.item__title}>{item.name}</h2>
                        {item.tags.map((tag) => (
                            <Link key={tag} to={`/list/${category}/${tag}`}>
                                <div className={styles.item__tag}>{tag}</div>
                            </Link>
                        ))}
                        <p className={styles.item__descr}>{item.descr}</p>
                        <div className={styles.item__actions}>
                            <div className={styles.item__price}>
                                <h2>${item.price}</h2>
                                <div
                                    className={
                                        item.inStock
                                            ? "text-green-500"
                                            : "text-stone-500"
                                    }
                                >
                                    {" "}
                                    {item.inStock ? "In Stock" : "Sold out"}
                                </div>
                            </div>
                            <ToCartButton item={item}/>
                        </div>
                    </div>
                </div>
                <div className={styles.item__specs}>
                    <div>
                        <h4>General</h4>
                        <ul>
                            {item.specs.general.map((text, i) => {
                                return <li key={i}>{text}</li>;
                            })}
                        </ul>
                    </div>
                    <div>
                        <h4>Neck</h4>
                        <ul>
                            {item.specs.neck.map((text, i) => {
                                return <li key={i}>{text}</li>;
                            })}
                        </ul>
                    </div>
                    <div>
                        <h4>Profile</h4>
                        <ul>
                            {item.specs.profile.map((text, i) => {
                                return <li key={i}>{text}</li>;
                            })}
                        </ul>
                    </div>
                </div>
                <div className={styles.item__size}>
                    <img alt="img" src={item.sizeImg}></img>
                    <ul>
                        {item.specs.size.map((item, i) => {
                            return <li key={i}>{item}</li>;
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default ItemPage;
