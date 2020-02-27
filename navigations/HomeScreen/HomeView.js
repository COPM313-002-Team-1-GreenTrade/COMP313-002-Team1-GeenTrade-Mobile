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
	View,
	Button,
	TouchableOpacity,
	Alert
} from 'react-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import '@firebase/firestore';
import * as Permissions from 'expo-permissions';
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import Environment from '../../config/FireBaseConfig';
import firebase from '../../config/firebase';
import Wave from 'react-native-waveview';
import { Dialog } from 'react-native-simple-dialogs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as FileSystem from 'expo-file-system';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const db = firebase.firestore();


export default class HomeView extends Component {
	PLASTIC_POINTS = 50;
	METAL_POINTS = 85;

	constructor(props) {
		super(props);
		this.state = {
			image: null,
			uploading: false,
			displayConfirmButton: false,
			googleResponse: null,
			totalEstimatedPoints: 0,
			dialogVisible: false,
			height: 0,
			recyclePoints: 0,
			maxPoints: 1000,
			percentage: null,
			user: {},
		};
	}

	toggleCamera = () => {
		this.setState({ dialogVisible: true })
	}
	_canceltoggle = () => {
		this.setState({ dialogVisible: false })
	}

	async componentDidMount() {
		const { navigation } = this.props;
		// refresh screen after purchasing new containers
		navigation.addListener('willFocus', () => {
			this.getUserEstimatedPoints();
		});
		
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		await Permissions.askAsync(Permissions.CAMERA);
		let db = firebase.firestore();
		db.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then(u => {
				if (u.exists) {
					this.setState({ user: u.data() });
				}
			});
		this.getUserEstimatedPoints();
		this.forceUpdate();
	}

	getUserEstimatedPoints = () => {
		try {
			db.collection("recycled-items")
				.where("collected", "==", false)
				.where("userId", "==", firebase.auth().currentUser.uid)
				.get().then((querySnapshot) => {
					let pointsSum = 0;
					querySnapshot.forEach((doc) => {
						pointsSum += doc.data().estimatedPoints;

					});
					let fillPercent = pointsSum / this.state.maxPoints;
					let fillHeight = fillPercent * wp('40%');
					this.setState({ totalEstimatedPoints: pointsSum, percentage: fillPercent, height: fillHeight });
					this.props.getPoints(pointsSum);
				});
		}
		catch (error) {
			console.log(error);
		}
	}

	render() {
		let { image } = this.state;
		const currentUser = firebase.auth().currentUser && firebase.auth().currentUser.displayName;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.header}>
						<View style={styles.iconWrapper}>
							<TouchableWithoutFeedback onPress={() => this.props.navigation.openDrawer()}>
							<Icon
								type="material"
								name="menu"
								size={30}
								color="#fff"
								containerStyle={styles.drawerIcon}
							/>
							</TouchableWithoutFeedback>
						</View>
						<View style={styles.titleWrapper}>
							<Text style={styles.textTitle}>Green Trade</Text>
						</View>
					</View>
				</View>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.welcomeWrapper}>
						<Text style={styles.welcomeTxt}>Welcome Back, {this.state.user.displayName}!</Text>
					</View>
					<View>
						{this.state.totalEstimatedPoints / this.state.maxPoints * 100 <= 80 ? (
							<View style={styles.waveContainer} >
								<Wave
									ref={(wave) => wave && wave.setWaterHeight(this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%'))}
									style={styles.waveBall}
									H={this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%')}
									waveParams={[
										{ A: 10, T: 260, fill: '#62c2ff' },
										{ A: 15, T: 220, fill: '#0087dc' },
										{ A: 20, T: 180, fill: '#1aa7ff' },
									]}
									animated={true}
								/>
								<Text style={styles.perText}>{parseFloat(this.state.totalEstimatedPoints / this.state.maxPoints).toFixed(2) * 100} %</Text>
							</View>
						) : <View style={styles.waveContainer} >
								<Wave
									ref={(wave) => wave && wave.setWaterHeight(this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%'))}
									style={styles.waveBall}
									H={this.state.totalEstimatedPoints / this.state.maxPoints * wp('40%')}
									waveParams={[
										{ A: 10, T: 260, fill: '#FF9F2E' },
										{ A: 15, T: 220, fill: '#F08200' },
										{ A: 20, T: 180, fill: '#B36100' },
									]}
									animated={true}
								/>
								<Text style={styles.perText}>{this.state.totalEstimatedPoints / this.state.maxPoints < 1 ? parseFloat(this.state.totalEstimatedPoints / this.state.maxPoints).toFixed(2) * 100 : 100} %</Text>
								{/* </TouchableHighlight> */}
							</View>}
					</View>
					<View style={styles.pointWrapper}>
						<Text style={styles.pointTxt}>{this.state.totalEstimatedPoints} {'estimated total points'.toUpperCase()}</Text>
					</View>
					<View style={styles.cameraWrapper}>
						<TouchableOpacity onPress={this.toggleCamera} style={styles.cameraImg}>
							<Image style={styles.cameraImg} source={require('../../assets/camera.png')} />
						</TouchableOpacity>
					</View>
					<View style={styles.dialogContainer}>
						<Dialog
							dialogStyle={styles.dialog}
							visible={this.state.dialogVisible}
						>
							<View style={styles.customDialog}>
								<TouchableOpacity onPress={this._pickImage}><Text style={styles.btnTxt}>Camera Roll</Text></TouchableOpacity>
								<TouchableOpacity onPress={this._takePhoto}><Text style={styles.btnTxt}>Take a photo</Text></TouchableOpacity>
								<TouchableOpacity onPress={this._canceltoggle}><Text style={styles.btnTxt}>Cancel</Text></TouchableOpacity>
							</View>
						</Dialog>
					</View>
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}>Capture Your Recyclables</Text>
						)}
					</View>
					<View style={styles.helpContainer}>
						{this._maybeRenderImage()}
						{this._maybeRenderUploadingOverlay()}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
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
		if (!image || !this.state.displayConfirmButton) {
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
					onPress={this.saveRecyclableImage}
					title="RECYCLE ITEM"
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
					<Image source={{ uri: image.uri }} style={{ width: 250, height: 250 }} />
				</View>
			</View>
		);
	};

	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this.setState({ dialogVisible: false })
		this._handleImagePicked(pickerResult);
	};

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this.setState({ dialogVisible: false })
		this._handleImagePicked(pickerResult);
	};

	_handleImagePicked = async (pickerResult) => {
		try {
			this.setState({ uploading: true });

			// If a photo was selected, call ML API and return us the contents of the image
			if (!pickerResult.cancelled) {
				let MLResponse = await this.submitToGoogle(pickerResult);
				let recycleItem = this.getRecylableItem(MLResponse)
				if (recycleItem !== null) {
					this.setState({ displayConfirmButton: true, recyclePoints: recycleItem.points, image: pickerResult });
				}
				else {
					Alert.alert("Invalid Picture", "The picture you selected does not contain a recyclable that we recognize. Please try again.");
					this.setState({ displayConfirmButton: false });
				}
				//uploadUrl = await uploadImageAsync(pickerResult.uri);
				//this.setState({ image: uploadUrl });
			}
		} catch (e) {
			console.log(e);
			//alert('Upload failed.');
		} finally {
			this.setState({ uploading: false });
		}
	};

	submitToGoogle = async (image) => {
		try {
			this.setState({ uploading: true });
			let encodedContent = await localImageToBase64Encode(image.uri);
			//console.log(encodedContent)
			let body = JSON.stringify({
				requests: [
					{
						features: [
							{ type: 'LABEL_DETECTION', maxResults: 10 },
							{ type: 'TEXT_DETECTION', maxResults: 10 },
							{ type: 'OBJECT_LOCALIZATION', maxResults: 10 },
						],
						image: {
							content: encodedContent,
						}
					}
				]

			});
			console.log('******************************************')
			console.log("body is " + body)
			let response = await fetch(
				"https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBJ4v954kAzclBzjxz6BcDgRTzmob1pPvA",
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
			console.log('******************************************')
			console.log("response is " + JSON.stringify(response))
			let responseJson = response.json();
			console.log(responseJson)
			 this.setState({
			 	googleResponse: responseJson,
				uploading: false
			});
			return responseJson
			//var newPoint = this.props.points + this.state.point;
			//this.props.getPoints(newPoint)
			//this.setState({isAdded: !this.state.isAdded})
		} catch (error) {
			alert("ML API failed to return a response. Please try again.");
			console.log("error is "+error);
		}
	};

	saveRecyclableImage = async () => {
		this.setState({ uploading: true });
		let storageURI = await uploadImageAsync(this.state.image.uri);
		let addedDoc = await this.saveImageToDB(storageURI);
		if (addedDoc) {
			this.props.getPoints(this.props.points + this.state.recyclePoints);
		}
		this.setState({ totalEstimatedPoints: this.state.totalEstimatedPoints + this.state.recyclePoints, displayConfirmButton: false });
	}

	saveImageToDB = async (uri) => {
		const user = firebase.auth().currentUser;

		return await db.collection("recycled-items").add({
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			collected: false,
			estimatedPoints: this.state.recyclePoints,
			imageUri: uri,
			userId: user.uid,
		})
			.then((ref) => {
				Alert.alert("Success!", "Recyclable successfully added to your recycling container.");
				console.log("Document successfully written!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			})
			.finally(() => {
				this.setState({ uploading: false });
			});
	}

	// This is so hacky and bad, but I'm tired and just want it to work
	// TODO: REFACTOR THIS UGLY MESS
	getRecylableItem(jsonResponse) {
		let hasMetal = false;
		let hasPlastic = false;
		let hasCheatCode = false;
		const cheatCode = "RECYCLE";

		let texts = jsonResponse.responses[0].textAnnotations;
		texts && texts.forEach((text) => {
			//console.log(text.description);
			if (text.description.toUpperCase().includes(cheatCode)) {
				hasCheatCode = true;
			}
			else if (text.description.toUpperCase().includes('METAL')) {
				hasMetal = true;
			}
			else if (text.description.toUpperCase().includes('PLASTIC')  || text.description.toUpperCase().includes('PACKAGE')) {
				hasPlastic = true;
			}
		});

		let labels = jsonResponse.responses[0].labelAnnotations;
		labels && labels.forEach((label) => {
			//console.log(label.description);
			if (label.description.toUpperCase().includes(cheatCode)) {
				hasCheatCode = true;
			}
			else if (label.description.toUpperCase().includes('METAL')) {
				hasMetal = true;
			}
			else if (label.description.toUpperCase().includes('PLASTIC') || label.description.toUpperCase().includes('PACKAGE')) {
				hasPlastic = true;
			}
		})

		let localizedObjects = jsonResponse.responses[0].localizedObjectAnnotations;
		localizedObjects && localizedObjects.forEach((localizedObject) => {
			//console.log(localizedObject.name);
			if (localizedObject.name.toUpperCase().includes(cheatCode)) {
				asCheatCode = true;
			}
			else if (localizedObject.name.toUpperCase().includes('METAL')) {
				hasMetal = true;
			}
			else if (localizedObject.name.toUpperCase().includes('PLASTIC') || localizedObject.name.toUpperCase().includes('PACKAGE')) {
				hasPlastic = true;
			}
		})

		if (hasCheatCode) {
			return {
				points: 750,
			}
		}
		else if (hasMetal) {
			return {
				points: this.METAL_POINTS,
			}
		}
		else if (hasPlastic) {
			return {
				points: this.PLASTIC_POINTS,
			}
		}
		else return null;
	}
}

async function localImageToBase64Encode(uri) {
	return await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
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

	return await ref.getDownloadURL();
}