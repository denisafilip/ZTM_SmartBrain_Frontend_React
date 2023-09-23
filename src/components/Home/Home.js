import React, { Component } from "react";
import "./Home.css";
import ParticlesBg from "particles-bg";

import Logo from "../Logo/Logo";
import Rank from "../Rank/Rank";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import ImageService from "../ImageService";
import AuthService from "../AuthService";

const MODEL_ID = 'face-detection';
const returnClarifaiRequestOptions = (imageUrl) => {
    console.log(process.env);
    console.log(process.env.CLARIFAI_USER_ID);
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": process.env.REACT_APP_CLARIFAI_USER_ID,
            "app_id": process.env.REACT_APP_CLARIFAI_APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });

    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + process.env.REACT_APP_CLARIFAI_PAT
        },
        body: raw
    };
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
            boxes: [],
            user: AuthService.getCurrentUser(),
        }
    }

    computeFaceLocation = (data) => {
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);

        return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box;
            console.log(clarifaiFace);
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            }
        });
    }

    displayFaceBoundingBox = (boxes) => {
        this.setState({boxes: boxes});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    updateUserEntries = (entries) => {
        let user = AuthService.getCurrentUser();
        Object.assign(user, { entries: entries });
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                entries: entries
            }
        }));
        localStorage.setItem('user', JSON.stringify(user));
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch(
            "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
            returnClarifaiRequestOptions(this.state.input)
        )
            .then(response => response.text())
            .then(result => {
                if (result) {
                    ImageService.increaseUserSubmittedImageRank()
                        .then((data) => {
                            if (data === 'User not found' || data === 'Error updating entries') {
                                alert(data);
                                return;
                            }
                            if (data) {
                                this.updateUserEntries(data);
                            }
                        });
                    this.setState({user: AuthService.getCurrentUser()});
                }
                this.displayFaceBoundingBox(
                    this.computeFaceLocation(
                        JSON.parse(result)
                    )
                );
            })
            .catch(error => console.log('error', error));
    }

    render = () => {
        const {imageUrl, boxes} = this.state;
        return (
            <div className="App">
                <ParticlesBg className="particles" type="cobweb" bg={true}/>
                <Logo/>
                <Rank/>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
            </div>
        );
    }

}

export default Home;