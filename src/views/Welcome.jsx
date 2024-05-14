import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './welcome.css'

export const Welcome = () => {
    const navigate = useNavigate()
    const [audioReady, setAudioReady] = useState(false)

    useEffect(() => {
        const audio = new Audio("/src/components/audio/star-wars-theme-song.mp3");
        audio.addEventListener('canplaythrough', () => {
            setAudioReady(true);
            audio.play();
            fadeOut(audio, 50000);
        });
        return () => {
            audio.removeEventListener('canplaythrough', () => {
                setAudioReady(true);
                audio.play();
                fadeOut(audio, 50000);
            });
            audio.pause(); // Pause the audio when the component unmounts
        };
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 50000);
        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const handleNavigation = () => {
            // Gradually fade out the audio when navigating away
            if (audioReady) {
                const audio = new Audio("/src/components/audio/star-wars-theme-song.mp3");
                audio.volume = 0.5; // Set initial volume to 0.5 to ensure the audio is audible before fading out
                fadeOut(audio, 2000, 48000); // Gradually fade out the audio over 2 seconds
            }
        };

        window.addEventListener('beforeunload', handleNavigation);
        return () => {
            window.removeEventListener('beforeunload', handleNavigation);
        };
    }, [audioReady]);

    const fadeOut = (audio, duration) => {
        const startVolume = audio.volume;
        const startTime = Date.now();

        const fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = duration - elapsed;
            const deltaVolume = startVolume / (remaining / 20); // Adjust the rate of volume decrease based on the remaining time

            if (remaining > 0) {
                audio.volume -= deltaVolume;
            } else {
                clearInterval(fadeInterval);
                audio.pause();
            }
        }, 100);
    };
    
    return (
        <section className="animation">
            <audio muted={!audioReady}>
                <source src="/src/components/audio/star-wars-theme-song.mp3" type="audio/mpeg" />
            </audio>
            <div className="crawl">
                <div className="title">
                    <p>Episode IV</p>
                    <p>A New Route</p>
                </div>
                <p>In a climbing gym far, far away, tensions rise as the Empire of Gravity tightens its grip on the craggy terrain. Amidst the towering walls and hanging belay stations, a group of rebel climbers seeks to defy the laws of nature and ascend to new heights.</p>     
                <p>Led by the fearless climber Luke Chalkewalker and his trusty droid, R2-Grip2, they embark on a daring adventure to unlock the secrets of the mystical Climb Force. Little do they know, the fate of the climbing galaxy hangs in the balance as they confront the dark lord of falls, Darth Sender, and his legion of grip-crushing stormholds.</p>
                <p>Join our heroes as they scale cliffs, conquer routes, and harness the power of the Climb Force to bring balance to the craggy universe...</p>
            </div>
        </section>
    )
}