import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView, // thêm import này
  Platform, // thêm import này
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps'; // Thêm dòng này ở đầu file

const width_window = Dimensions.get('window').width;
const height_window = Dimensions.get('window').height;

const nearestBarbers = [
  {
    id: '1',
    name: 'Alana Barbershop - Haircut massage & Spa',
    location: 'Banguntapan (5 km)',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Hercha Barbershop - Haircut & Styling',
    location: 'Jalan Kaliurang (8 km)',
    rating: 5.0,
  },
  {
    id: '3',
    name: 'Barberking – Haircut styling & massage',
    location: 'Jogja Expo Centre (12 km)',
    rating: 4.5,
  },
];

const recommendedBarbers = [
  {
    id: '4',
    name: 'Master piece Barbershop – Haircut styling',
    location: 'Joga Expo Centre (2 km)',
    rating: 5.0,
  },
  {
    id: '5',
    name: 'Varcity Barbershop Jogja ex The Varcher',
    location: 'Condongcatur (10 km)',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Twinsky Monkey Barber & Men Stuff',
    location: 'Jl Taman Siswa (8 km)',
    rating: 5.0,
  },
  {
    id: '7',
    name: 'Barberman – Haircut styling & massage',
    location: 'J-Walk Centre (17 km)',
    rating: 4.5,
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filterVisible: false,
      selectedCategory: 'Basic haircut',
      selectedRating: 4,
      distanceMin: '0.1',
      distanceMax: '10',
    };
  }

  handleCategoryPress = category => {
    this.setState({ selectedCategory: category });
  };

  handleStarPress = rating => {
    this.setState({ selectedRating: rating });
  };

  renderBarberItem = ({ item }) => (
    <View style={styles.barberItem}>
      <View style={styles.barberImagePlaceholder}>
        <Icon name="user" size={28} color="#A1E3F8" />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.barberName}>{item.name}</Text>
        <View style={styles.barberInfoRow}>
          <Icon name="map-pin" size={14} color="#6B7280" />
          <Text style={styles.barberLocation}>{item.location}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.barberRating}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );

  renderFilterModal = () => (
    <Modal
      visible={this.state.filterVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => this.setState({ filterVisible: false })}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIconWrap}>
                <Icon name="help-circle" size={22} color="#FFD700" />
              </View>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => this.setState({ filterVisible: false })}
              >
                <Icon name="x" size={22} color="#A1A1AA" />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 24 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalBody}>
                <Text style={styles.modalLabel}>General Category</Text>
                <View style={styles.categoryRow}>
                  {[
                    'Basic haircut',
                    'Coloring',
                    'Treatment',
                    'Massage',
                    'Kids haircut',
                  ].map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={
                        this.state.selectedCategory === cat
                          ? styles.categoryBtnActive
                          : styles.categoryBtn
                      }
                      onPress={() => this.handleCategoryPress(cat)}
                    >
                      <Text
                        style={
                          this.state.selectedCategory === cat
                            ? styles.categoryTextActive
                            : styles.categoryText
                        }
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={[styles.modalLabel, { marginTop: 18 }]}>
                  Rating Barber
                </Text>
                <View style={styles.ratingStarsRow}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => this.handleStarPress(i)}
                    >
                      <Icon
                        name="star"
                        size={28}
                        color={
                          i <= this.state.selectedRating ? '#FFA500' : '#E5E7EB'
                        }
                        style={{ marginRight: 2 }}
                      />
                    </TouchableOpacity>
                  ))}
                  <Text style={styles.ratingValue}>
                    ({this.state.selectedRating}.0)
                  </Text>
                </View>
                <Text style={[styles.modalLabel, { marginTop: 18 }]}>
                  Distance
                </Text>
                <View style={styles.distanceRow}>
                  <View style={styles.distanceInputWrap}>
                    <TextInput
                      style={styles.distanceInput}
                      keyboardType="numeric"
                      value={this.state.distanceMin}
                      onChangeText={text =>
                        this.setState({ distanceMin: text })
                      }
                      placeholder="Min"
                      placeholderTextColor="#A1A1AA"
                      returnKeyType="done"
                    />
                  </View>
                  <Text style={styles.distanceDash}>-</Text>
                  <View style={styles.distanceInputWrap}>
                    <TextInput
                      style={styles.distanceInput}
                      keyboardType="numeric"
                      value={this.state.distanceMax}
                      onChangeText={text =>
                        this.setState({ distanceMax: text })
                      }
                      placeholder="Max"
                      placeholderTextColor="#A1A1AA"
                      returnKeyType="done"
                    />
                  </View>
                  <Text style={styles.distanceUnit}>km</Text>
                </View>
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => this.setState({ filterVisible: false })}
                >
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F6FB" />
        <View style={styles.root}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <View style={styles.headerRow}>
                  <Icon name="map-pin" size={16} color="#A1E3F8" />
                  <Text style={styles.locationText}>Yogyakarta</Text>
                </View>
                <Text style={styles.userText}>Joe Samanta</Text>
              </View>
              <TouchableOpacity>
                {/* Nếu chưa có avatar, dùng icon tạm */}
                <View style={styles.avatarPlaceholder}>
                  <Icon name="user" size={24} color="#A1E3F8" />
                </View>
              </TouchableOpacity>
            </View>
            {/* Banner */}
            <View style={styles.bannerCard}>
              {/* Nếu chưa có banner, dùng icon tạm */}
              <View style={styles.bannerImagePlaceholder}>
                <Icon name="image" size={40} color="#A1E3F8" />
              </View>
              <TouchableOpacity style={styles.bookingNowBtn}>
                <Text style={styles.bookingNowText}>Booking Now</Text>
              </TouchableOpacity>
            </View>
            {/* Search */}
            <View style={styles.searchRow}>
              <View style={styles.searchInputWrap}>
                <Icon name="search" size={20} color="#A1A1AA" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search barber's, haircut service..."
                  placeholderTextColor="#A1A1AA"
                  value={this.state.search}
                  onChangeText={search => this.setState({ search })}
                />
              </View>
              <TouchableOpacity
                style={styles.searchBtn}
                onPress={() => this.setState({ filterVisible: true })}
              >
                <Icon name="sliders" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {/* Nearest Barbershop */}
            <Text style={styles.sectionTitle}>Nearest Babershop</Text>
            <FlatList
              data={nearestBarbers}
              renderItem={this.renderBarberItem}
              keyExtractor={item => item.id}
              horizontal={false}
              scrollEnabled={false}
            />
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>
                See All <Icon name="arrow-up-right" size={16} color="#363062" />
              </Text>
            </TouchableOpacity>
            {/* Most recommended */}
            <Text style={styles.sectionTitle}>Most recommended</Text>
            <FlatList
              data={recommendedBarbers}
              renderItem={this.renderBarberItem}
              keyExtractor={item => item.id}
              horizontal={false}
              scrollEnabled={false}
            />
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>
                See All <Icon name="arrow-up-right" size={16} color="#363062" />
              </Text>
            </TouchableOpacity>
            {/* Find a barber nearby */}
            <Text style={styles.sectionTitle}>Find a barber nearby</Text>
            <View style={styles.mapCard}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: -7.797068,
                  longitude: 110.370529,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
                showsUserLocation={true}
              >
                {/* Marker cho các barber */}
                {nearestBarbers.map(barber => (
                  <Marker
                    key={barber.id}
                    coordinate={{
                      latitude: -7.797068 + Math.random() * 0.01,
                      longitude: 110.370529 + Math.random() * 0.01,
                    }}
                    title={barber.name}
                    description={barber.location}
                  >
                    <View style={styles.markerCircle}>
                      <Icon name="home" size={24} color="#fff" />
                    </View>
                  </Marker>
                ))}
              </MapView>
              <TouchableOpacity style={styles.findNowBtnCustom}>
                <Text style={styles.findNowTextCustom}>
                  Find now <Icon name="search" size={16} color="#fff" />
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <Icon name="home" size={22} color="#363062" />
              <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Icon name="calendar" size={22} color="#363062" />
              <Text style={styles.navText}>Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Icon name="user" size={22} color="#363062" />
              <Text style={styles.navText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Icon name="settings" size={22} color="#363062" />
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
          {this.renderFilterModal()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  root: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width_window * 0.05,
    paddingTop: height_window * 0.01,
    paddingBottom: height_window * 0.01,
    marginBottom: height_window * 0.002,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    color: '#A1E3F8',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  userText: {
    color: '#363062',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerCard: {
    marginHorizontal: width_window * 0.045,
    marginTop: height_window * 0.01,
    backgroundColor: '#fff',
    borderRadius: width_window * 0.045,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: height_window * 0.015,
    elevation: 2,
  },
  bannerImagePlaceholder: {
    width: '100%',
    height: height_window / 6,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A1E3F8',
  },
  bookingNowBtn: {
    backgroundColor: '#363062',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 18,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width_window * 0.045,
    marginTop: height_window * 0.022,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F7', // màu nền sáng hơn
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#363062',
    marginLeft: 8,
    fontWeight: '500',
  },
  searchBtn: {
    backgroundColor: '#363062',
    borderRadius: 12,
    padding: 12,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: width_window * 0.045,
    color: '#363062',
    marginHorizontal: width_window * 0.045,
    marginTop: height_window * 0.03,
    marginBottom: height_window * 0.012,
  },
  barberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width_window * 0.035,
    padding: width_window * 0.025,
    marginHorizontal: width_window * 0.045,
    marginBottom: height_window * 0.012,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  barberImage: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  barberImagePlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A1E3F8',
  },
  barberName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#363062',
  },
  barberInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  barberLocation: {
    color: '#6B7280',
    fontSize: 13,
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  barberRating: {
    color: '#363062',
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '600',
  },
  seeAllBtn: {
    alignSelf: 'flex-end',
    marginRight: width_window * 0.045,
    marginBottom: height_window * 0.01,
    marginTop: -height_window * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#363062',
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'underline',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapCard: {
    marginHorizontal: width_window * 0.045,
    marginTop: height_window * 0.012,
    backgroundColor: '#fff',
    borderRadius: width_window * 0.045,
    overflow: 'hidden',
    alignItems: 'center',
    padding: width_window * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: '#363062',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#363062',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 44, 44, 0.18)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: width_window * 0.06,
    borderTopRightRadius: width_window * 0.06,
    paddingHorizontal: width_window * 0.06,
    paddingTop: height_window * 0.022,
    paddingBottom: height_window * 0.04,
    minHeight: height_window * 0.55,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height_window * 0.015,
  },
  modalIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF9E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#363062',
    flex: 1,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalBody: {
    marginTop: height_window * 0.01,
  },
  modalLabel: {
    fontWeight: 'bold',
    fontSize: width_window * 0.04,
    color: '#363062',
    marginBottom: height_window * 0.01,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    paddingVertical: height_window * 0.008,
    paddingHorizontal: width_window * 0.035,
    borderRadius: width_window * 0.04,
    backgroundColor: '#F3F6FB',
    marginRight: width_window * 0.02,
    marginBottom: height_window * 0.01,
  },
  categoryBtnActive: {
    paddingVertical: height_window * 0.008,
    paddingHorizontal: width_window * 0.035,
    borderRadius: width_window * 0.04,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#363062',
    marginRight: width_window * 0.02,
    marginBottom: height_window * 0.01,
  },
  categoryText: {
    color: '#363062',
    fontWeight: '500',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#363062',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height_window * 0.01,
    marginTop: height_window * 0.005,
  },
  ratingValue: {
    marginLeft: 8,
    color: '#363062',
    fontWeight: '500',
    fontSize: 14,
  },
  ratingSliderWrap: {
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  ratingSliderBar: {
    width: '90%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    position: 'relative',
    marginTop: 6,
    marginBottom: 6,
  },
  ratingSliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 6,
    backgroundColor: '#FFA500',
    borderRadius: 3,
  },
  ratingSliderThumb: {
    position: 'absolute',
    left: '80%',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#A1A1AA',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height_window * 0.01,
    marginBottom: height_window * 0.022,
  },
  distanceInputWrap: {
    backgroundColor: '#F3F6FB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 48,
    alignItems: 'center',
  },
  distanceInput: {
    color: '#363062',
    fontWeight: 'bold',
    fontSize: 15,
  },
  distanceDash: {
    marginHorizontal: 8,
    color: '#363062',
    fontWeight: 'bold',
    fontSize: 18,
  },
  distanceUnit: {
    marginLeft: 8,
    color: '#363062',
    fontWeight: '500',
    fontSize: 15,
  },
  applyBtn: {
    backgroundColor: '#363062',
    borderRadius: width_window * 0.03,
    paddingVertical: height_window * 0.018,
    alignItems: 'center',
    marginTop: height_window * 0.022,
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  markerCircle: {
    backgroundColor: '#FFA500',
    borderRadius: 24,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  findNowBtnCustom: {
    position: 'absolute',
    bottom: height_window * 0.02,
    right: width_window * 0.04,
    backgroundColor: '#363062',
    borderRadius: width_window * 0.03,
    paddingVertical: height_window * 0.015,
    paddingHorizontal: width_window * 0.09,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
});
