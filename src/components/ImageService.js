import AuthService from "./AuthService";

const API_URL = 'http://localhost:8080/';

class ImageService {
    increaseUserSubmittedImageRank = () => {
        return fetch(API_URL + 'image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: AuthService.getCurrentUser()._id,
            })
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            });
    }
}

export default new ImageService();