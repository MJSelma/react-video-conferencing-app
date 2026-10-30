import uitoolkit, { CustomizationOptions } from "@zoom/videosdk-ui-toolkit";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import "./App.css";

function App() {
    let sessionContainer = null;
    // set your auth endpoint here
    // a sample is available here: https://github.com/zoom/videosdk-auth-endpoint-sample
    const authEndpoint = "https://generatezoomtoken-zly5zmxc7a-uc.a.run.app"; // http://localhost:4000
    const config = {
        videoSDKJWT: "",
        sessionName: "Math_Class-1123344",
        userName: "Melvin",
        sessionPasscode: "",
        featuresOptions: {
            preview: {
                enable: true,
            },
            virtualBackground: {
                enable: true,
                virtualBackgrounds: [
                    {
                        url: "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
                    },
                ],
            },
        },
    };
    const role = 1;

    function getVideoSDKJWT() {
        sessionContainer = document.getElementById(
            "sessionContainer"
        );
        const joinFlowElem = document.getElementById("join-flow");
        if (joinFlowElem) {
            joinFlowElem.style.display = "none";
        }
        fetch(authEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionName: config.sessionName, // "test"
                role: role,                      // 1
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    console.log(data.token);
                    config.videoSDKJWT = data.token;
                    joinSession();
                } else {
                    console.log(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function joinSession() {
        console.log(config);
        if (sessionContainer) {
            uitoolkit.joinSession(sessionContainer, config);
            sessionContainer && uitoolkit.onSessionClosed(sessionClosed);
            uitoolkit.onSessionDestroyed(sessionDestroyed);
        }
    }

    const sessionClosed = () => {
        console.log("session closed");
        const joinFlowElem = document.getElementById("join-flow");
        if (joinFlowElem) {
            joinFlowElem.style.display = "block";
        }
    };

    const sessionDestroyed = () => {
        console.log("session destroyed");
        uitoolkit.destroy();
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div id="join-flow" style={{ textAlign: "center" }}>
                <h1>Zoom Video SDK React Sample</h1>
                <p>UI powered by Zoom UI Toolkit</p>
                <button onClick={getVideoSDKJWT}>Join Session</button>
            </div>

            <div
                id="sessionContainer"
                style={{
                    width: "100%",
                    maxWidth: "1280px",
                    height: "720px",
                    display: "none", // initially hidden; shown after join
                    backgroundColor: "#000",
                }}
            />
        </div>
    );
}

export default App;