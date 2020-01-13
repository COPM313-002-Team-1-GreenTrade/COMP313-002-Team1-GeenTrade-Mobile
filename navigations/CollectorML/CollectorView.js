import React, { Component } from "react";
import {
	ActivityIndicator,
	Clipboard,
	FlatList,
	Image,
	Share,
	StyleSheet,
	Text,
	ScrollView,
	View
} from 'react-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import '@firebase/firestore';
import * as Permissions from 'expo-permissions';
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import Environment from '../../config/FireBaseConfig';
import firebase from '../../config/firebase';
const db = firebase.firestore();


export default class CollectorView extends Component {
	constructor(props) {
		super(props);
		this.getInitialPoints()


	}
	state = {
		image: null,
		uploading: false,
		googleResponse: null,
		points: 0,
		rewardPoint: 0,
		analyzed: false,
    };
    
	async componentDidMount() {
		await Permissions.askAsync(Permissions.CAMERA);
	}

	render() {
		let { image } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.header}>
						<View style={styles.iconWrapper}>
							<Icon
								onPress={() => this.props.navigation.openDrawer()}
								type="material"
								name="menu"
								size={30}
								color="#fff"
								containerStyle={styles.drawerIcon}
							/>
						</View>
						<View style={styles.titleWrapper}>
							<Text style={styles.textTitle}>Collector ML</Text>
						</View>
					</View>
				</View>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}>Confirm User Containers</Text>
						)}
					</View>

					<View style={styles.helpContainer}>
						{/* <Button
							onPress={() => {
								this._pickImage()
								this.setState({ analyzed: !this.state.analyzed })
							}}
							title="Pick an image from camera roll"
						/> */}

						<Button style={styles.takePhoto} onPress={this._takePhoto} title="Take a photo" />

						<FlatList
							data={this.state.googleResponse ? this.state.googleResponse.responses[0].labelAnnotations : null}
							extraData={this.state}
							keyExtractor={this._keyExtractor}
							renderItem={({ item }) => {
								// let Points;
								switch (item.description) {
									case "Plastic":
										this.props.addPoints(50)
										alert(`Awsome`);
										break;
									case "Metal":
										this.props.addPoints(70)

										alert(`Awsome`);
										break;
									default:
										break;

								}
								this.updatePoints()

								return <Text>Item: {item.description}</Text>
							}}

						/>

						{this._maybeRenderImage()}
						{this._maybeRenderUploadingOverlay()}
					</View>
				</ScrollView>

			</SafeAreaView>
		);
	}

	organize = array => {
		return array.map(function (item, i) {
			return (
				<View key={i}>
					<Text>{item}</Text>
				</View>
			);
		});
	};
	async updatePoints() {
		const user = firebase.auth().currentUser;
		let uid;
		if (user != null) {
			uid = user.uid;
			const db = firebase.firestore();
			const docRef = db.collection('users').doc(uid);
			docRef.update({
				points: this.props.rewardPoints

			});

		}
	}


	_maybeRenderUploadingOverlay = () => {
		if (this.state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center'
						}
					]}
				>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		}
	};
	_maybeRenderImage = () => {
		let { image, googleResponse } = this.state;
		const { navigation } = this.props;

		const name = navigation.state.params.Name;
		const address = navigation.state.params.Address;
		const date = navigation.state.params.scheduledtime;
		const userId = navigation.state.params.UserId;
		console.log("Get current user data")

		if (!image) {
			return;
		}

		return (
			<View
				style={{
					marginTop: 20,
					width: 250,
					borderRadius: 3,
					elevation: 2
				}}
			>
				<Button
					style={{ marginBottom: 10 }}
					onPress={() => {
						this.submitToGoogle()
						this.saveToDB(name, address, date, userId)
					}}
					title="Analyze!"
				/>

				<View
					style={{
						borderTopRightRadius: 3,
						borderTopLeftRadius: 3,
						shadowColor: 'rgba(0,0,0,1)',
						shadowOpacity: 0.2,
						shadowOffset: { width: 4, height: 4 },
						shadowRadius: 5,
						overflow: 'hidden'
					}}
				>
					<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
				</View>
				<Text
					onPress={this._copyToClipboard}
					onLongPress={this._share}
					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
				/>

				{/* <Text>Raw JSON:</Text> */}

				{/* {googleResponse && (
					<Text
						onPress={this._copyToClipboard}
						onLongPress={this._share}
						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
					>
						{JSON.stringify(googleResponse.responses)}
					</Text>
				)} */}
			</View>
		);
	};
	_keyExtractor = (item, index) => item.id;

	_renderItem = item => {
		<Text>response: {JSON.stringify(item)}</Text>;
	};

	saveToDB = (name, address, date, userId) =>{
		console.log(name)
		console.log(address)
		console.log(date)
		console.log(userId)
	}

	_share = () => {
		Share.share({
			message: JSON.stringify(this.state.googleResponse.responses),
			title: 'Check it out',
			url: this.state.image
		});
	};

	_copyToClipboard = () => {
		Clipboard.setString(this.state.image);
		alert('Copied to clipboard');
	};

	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
	};

	// _pickImage = async () => {
	// 	let pickerResult = await ImagePicker.launchImageLibraryAsync({
	// 		allowsEditing: true,
	// 		aspect: [4, 3]
	// 	});

	// 	this._handleImagePicked(pickerResult);
	// };

	_handleImagePicked = async pickerResult => {
		try {
			this.setState({ uploading: true });

			if (!pickerResult.cancelled) {
				uploadUrl = await uploadImageAsync(pickerResult.uri);
				this.setState({ image: uploadUrl });
			}
		} catch (e) {
			console.log(e);
			alert('Upload failed, sorry :(');
		} finally {
			this.setState({ uploading: false });
		}
	};

	submitToGoogle = async () => {
		try {
			this.setState({ uploading: true });
			let { image } = this.state;
			let body = JSON.stringify({
				requests: [
					{
						features: [
							{ type: 'LABEL_DETECTION', maxResults: 10 },
							{ type: 'LANDMARK_DETECTION', maxResults: 5 },
							{ type: 'FACE_DETECTION', maxResults: 5 },
							{ type: 'LOGO_DETECTION', maxResults: 5 },
							{ type: 'TEXT_DETECTION', maxResults: 5 },
							{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
							{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
							{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
							{ type: 'CROP_HINTS', maxResults: 5 },
							{ type: 'WEB_DETECTION', maxResults: 5 }
						],
						image: {
							source: {
								imageUri: image
							}
						}
					}
				]

			});
			let response = await fetch(
				"https://vision.googleapis.com/v1/images:annotate?key=" +
				Environment['GOOGLE_CLOUD_VISION_API_KEY'],
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
			let responseJson = await response.json();
			// alert(JSON.stringify(responseJson));
			this.setState({
				googleResponse: responseJson,
				uploading: false
			});
		} catch (error) {
			console.log(error);
		}
	};
}

async function uploadImageAsync(uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			console.log(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	const ref = firebase
		.storage()
		.ref()
		.child(uuid.v4());


	const snapshot = await ref.put(blob);

	blob.close();

	const picURI = await ref.getDownloadURL()
	console.log(picURI)
	const user = firebase.auth().currentUser;

	db.collection("recycled-items").doc().set({
		createdAt: Date.now(),
		Collected: false,
		estimatedPoints: "50",
		imageUri: picURI,
		userId: user.uid
	})
		.then(function () {
			console.log("Document successfully written!");
		})
		.catch(function (error) {
			console.error("Error writing document: ", error);
		});


	return await snapshot.ref.getDownloadURL()


}
