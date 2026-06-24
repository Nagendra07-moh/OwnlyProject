import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import Entypo from '@expo/vector-icons/Entypo';
import ToggleSwitch from './ToggleSwitch';

const AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80';

export function HomeHeader() {
  return (
    <View style={styles.wrap}>
      <View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.location}>HSR Layout </Text>
          <Entypo name="chevron-small-down" size={24} color="black"/>
        </View>
        
        <Text style={styles.address}>3rd main road, 4th cross road</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.vegBox}>
          <Text style={styles.vegText}>VEG</Text>
          <ToggleSwitch initialValue={true} onToggle={()=>{}}/>
        </View>
        <Image source={{ uri: AVATAR }} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  location: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  address: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  vegBox: {
    alignItems: 'center',
    gap: 4,
  },
  vegText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '800',
  },
  toggle: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#20dd57',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 3,
  },
  knob: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: colors.surface,
  },
});
