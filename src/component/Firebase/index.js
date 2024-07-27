import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

function FirebaseComponent({ serial, inUseAt, notInUseAt }) {
    const [isWarning, setIsWarning] = useState(false);
    const [continueWarning, setContinueWarning] = useState(true);
    const alertMarkCheck = parseFloat(localStorage.getItem('alertMark') || '0');

    useEffect(() => {
        const firebaseConfig = {
            apiKey: 'AIzaSyBkml6LOe9i1XCPHuEZD1HnKtOLVbPzYbo',
            authDomain: 'ibmelab-firebase.firebaseapp.com',
            databaseURL: 'https://ibmelab-firebase-default-rtdb.asia-southeast1.firebasedatabase.app',
            projectId: 'ibmelab-firebase',
            storageBucket: 'ibmelab-firebase.appspot.com',
            messagingSenderId: '476643915776',
            appId: '1:476643915776:web:a29161d17f36a1bd9580e5',
            measurementId: 'G-4ZVSTZYJN0',
        };

        const app = initializeApp(firebaseConfig);
        const dataBase = getDatabase(app);

        let uri;
        if (serial === 'D001') {
            uri = `ibme/device/data/D001`;
        } else if (serial === 'D002') {
            uri = `ibme/device/data/D002`;
        } else {
            uri = `ibme/device/data/D003`;
        }
        console.log(uri);

        const specificDeviceRef = ref(dataBase, uri);

        const unsubscribe = onValue(specificDeviceRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            if (notInUseAt === 10000000000 || notInUseAt <= new Date().getTime() + 10000000000) {
                notInUseAt = new Date().getTime() + 10000000000;
                const entries = Object.entries(data);
                const latestEntry = entries[entries.length - 1][1];
                console.log('hello', latestEntry.volume);
                if (latestEntry.volume >= alertMarkCheck) {
                    if (continueWarning) {
                        setIsWarning(true);
                    } else {
                        setIsWarning(false);
                    }
                }
            }

            const filteredData = Object.entries(data)
                .filter(([key, value]) => {
                    return (
                        new Date(value.timestamp).getTime() >= inUseAt &&
                        new Date(value.timestamp).getTime() <= notInUseAt
                    );
                })
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});

            const volumes = Object.values(filteredData).map((item) => item.volume);
            const timestamps = Object.values(filteredData).map((item) => new Date(item.timestamp));
            console.log(volumes);

            // Draw chart
            drawChart(volumes, timestamps);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [serial, inUseAt, notInUseAt, continueWarning, alertMarkCheck]);

    return <div id="chartContainer">Chart will be rendered here</div>;
}

function drawChart(volumes, timestamps) {
    // Hàm này vẽ biểu đồ sử dụng volumes và timestamps
    console.log('Drawing chart with volumes:', volumes, 'and timestamps:', timestamps);
}

export default FirebaseComponent;
