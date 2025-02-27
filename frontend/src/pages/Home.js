import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import cookieImage from "./cookie.png";

const PRIZE_IMAGES = {
    HAND: "/images/tap.png",
    GIFT: "/images/giftbox.png",
    GOLDTROPHY: "/images/trophy.png",
    SILVERTROPHY: "/images/silver.png",
    CHOCLATECOOKIE: "/images/cookie.png"
};

const Home = () => {
    const [counter, setCounter] = useState(0);
    const [bonuses, setBonuses] = useState([]);
    const [prizes, setPrizes] = useState([]);
    const [user, setUser] = useState(null);
    const [floatingText, setFloatingText] = useState([]);
    const [localUpdates, setLocalUpdates] = useState(0);

    useEffect(() => {
        axios.get("https://cookie-j3zs.onrender.com/score/gift")
            .then(response => setPrizes(response.data.prizes || []))
            .catch(() => setPrizes([]));
    
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            axios.get(`https://cookie-j3zs.onrender.com/user/${userId}`)
                .then(response => {
                    const userData = response.data.user;
                    setUser(userData);
                    setCounter(userData.score.totalScore || 0);
                    setBonuses(userData.score.bonusesReceived || []);
                    setPrizes(userData.score.prizesWon || []);
                })
                .catch(() => {
                    setUser(null);
                    setCounter(0);
                    setBonuses([]);
                    setPrizes([]);
                });
        }
    }, []);
    

    useEffect(() => {
        if (localUpdates >= 10) {
            axios.post("https://cookie-j3zs.onrender.com/score/add", {
                userId: sessionStorage.getItem("userId"),
                totalScore: counter,
                bonusesReceived: bonuses,
                prizesWon: prizes,
            }).then(() => {
                setLocalUpdates(0);
            }).catch(error => console.error("Error syncing score:", error));
        }
    }, [localUpdates, counter, bonuses, prizes]);

    const handleClick = () => {
        let newCounter = counter + 1;
        let newBonuses = [...bonuses];
        let newPrizes = [...prizes];
        let newFloatingText = { id: Date.now(), text: "+1", type: "default" };

        if (Math.random() < 0.5) {
            newBonuses.push(10);
            newCounter += 10;
            newFloatingText = { id: Date.now(), text: "+10", type: "bonus" };
        }

        if (Math.random() < 0.25) {
            const prizeKeys = Object.keys(PRIZE_IMAGES);
            const randomPrize = prizeKeys[Math.floor(Math.random() * prizeKeys.length)];
            newPrizes.push(randomPrize);
            newFloatingText = { id: Date.now(), text: `🎁 ${randomPrize}`, type: "prize" };
        }

        setCounter(newCounter);
        setBonuses(newBonuses);
        setPrizes(newPrizes);
        setFloatingText(prev => [...prev, newFloatingText]);
        setLocalUpdates(prev => prev + 1);

        setTimeout(() => {
            setFloatingText(prev => prev.filter(item => item.id !== newFloatingText.id));
        }, 1500);
    };

    return (
        <div className="relative h-screen w-screen bg-blue-500 flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute top-5 left-5 flex space-x-4">
                {Object.keys(PRIZE_IMAGES).map((prize, index) => {
                    const prizeCount = prizes.filter(p => p === prize).length || 0; 
                    return (
                        <div key={index} className="relative text-center">
                            <img src={PRIZE_IMAGES[prize]} alt={prize} className="w-12 h-12" />
                            <p className="text-lg font-bold">{prizeCount}</p>
                        </div>
                    );
                })}
            </div>


            {floatingText.map(({ id, text, type }) => (
                <motion.p
                    key={id}
                    initial={{ opacity: 1, y: -20 }} 
                    animate={{ opacity: 0, y: type === "default" ? 50 : -50 }}
                    transition={{ duration: 1 }}
                    className={`absolute text-2xl font-extrabold ${
                        type === "bonus" ? "text-yellow-400" : type === "prize" ? "text-green-400" : "text-white"
                    }`}
                >
                    {text}
                </motion.p>
            ))}

            <h1 className="text-5xl font-extrabold">Total Score: {counter}</h1>
            <motion.img
                src={cookieImage}
                alt="Cookie"
                className="w-40 h-40 mt-5 cursor-pointer"
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
            />
            <p className="mt-5 text-xl font-bold">Player: {user ? user.name : "Unknown"}</p>
        </div>
    );
};

export default Home;
