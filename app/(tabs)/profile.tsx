import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { User, Settings, ShoppingBag, CreditCard, Bell, CircleHelp as HelpCircle, ChevronRight, Star, Package, CreditCard as Edit, Save, X } from 'lucide-react-native';

export default function ProfileScreen() {
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [paymentMethodsVisible, setPaymentMethodsVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [helpCenterVisible, setHelpCenterVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [ordersVisible, setOrdersVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    priceDrops: true
  });

  // Mock data
  const orders = [
    { id: '1', date: '2024-01-15', total: 159, status: 'Delivered', items: 'Nike Air Max 270 React' },
    { id: '2', date: '2024-01-10', total: 45, status: 'Shipped', items: 'Crocs Classic Clog' },
    { id: '3', date: '2024-01-05', total: 190, status: 'Processing', items: 'Adidas Ultraboost 22' }
  ];

  const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/26' },
    { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/25' }
  ];

  const MenuItem = ({ icon, title, subtitle, onPress, showBadge = false }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {showBadge && <View style={styles.badge} />}
        <ChevronRight size={20} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  );

  const EditProfileModal = () => (
    <Modal visible={editProfileVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setEditProfileVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={() => {
            Alert.alert('Success', 'Profile updated successfully!');
            setEditProfileVisible(false);
          }}>
            <Save size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.name}
              onChangeText={(text) => setUserProfile({...userProfile, name: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.email}
              onChangeText={(text) => setUserProfile({...userProfile, email: text})}
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.phone}
              onChangeText={(text) => setUserProfile({...userProfile, phone: text})}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.address}
              onChangeText={(text) => setUserProfile({...userProfile, address: text})}
              multiline
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const OrdersModal = () => (
    <Modal visible={ordersVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setOrdersVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>My Orders</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.modalContent}>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>Order #{order.id}</Text>
                <Text style={[styles.orderStatus, { color: order.status === 'Delivered' ? '#34C759' : order.status === 'Shipped' ? '#007AFF' : '#FF9500' }]}>
                  {order.status}
                </Text>
              </View>
              <Text style={styles.orderDate}>{order.date}</Text>
              <Text style={styles.orderItems}>{order.items}</Text>
              <Text style={styles.orderTotal}>${order.total}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const PaymentMethodsModal = () => (
    <Modal visible={paymentMethodsVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setPaymentMethodsVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Payment Methods</Text>
          <TouchableOpacity onPress={() => Alert.alert('Add Card', 'Add new payment method functionality')}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentCard}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentType}>{method.type}</Text>
                <Text style={styles.paymentNumber}>•••• •••• •••• {method.last4}</Text>
                <Text style={styles.paymentExpiry}>Expires {method.expiry}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#007AFF" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const NotificationsModal = () => (
    <Modal visible={notificationsVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setNotificationsVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Notifications</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>Order Updates</Text>
            <TouchableOpacity
              style={[styles.toggle, notifications.orderUpdates && styles.toggleActive]}
              onPress={() => setNotifications({...notifications, orderUpdates: !notifications.orderUpdates})}
            >
              <View style={[styles.toggleThumb, notifications.orderUpdates && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>Promotions</Text>
            <TouchableOpacity
              style={[styles.toggle, notifications.promotions && styles.toggleActive]}
              onPress={() => setNotifications({...notifications, promotions: !notifications.promotions})}
            >
              <View style={[styles.toggleThumb, notifications.promotions && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>New Arrivals</Text>
            <TouchableOpacity
              style={[styles.toggle, notifications.newArrivals && styles.toggleActive]}
              onPress={() => setNotifications({...notifications, newArrivals: !notifications.newArrivals})}
            >
              <View style={[styles.toggleThumb, notifications.newArrivals && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>Price Drops</Text>
            <TouchableOpacity
              style={[styles.toggle, notifications.priceDrops && styles.toggleActive]}
              onPress={() => setNotifications({...notifications, priceDrops: !notifications.priceDrops})}
            >
              <View style={[styles.toggleThumb, notifications.priceDrops && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const HelpCenterModal = () => (
    <Modal visible={helpCenterVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setHelpCenterVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Help Center</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.helpSection}>
            <Text style={styles.helpSectionTitle}>Frequently Asked Questions</Text>
            <TouchableOpacity style={styles.helpItem}>
              <Text style={styles.helpQuestion}>How do I track my order?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpItem}>
              <Text style={styles.helpQuestion}>What is your return policy?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpItem}>
              <Text style={styles.helpQuestion}>How do I change my size?</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.helpSection}>
            <Text style={styles.helpSectionTitle}>Contact Support</Text>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Chat with us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Email support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const ReviewsModal = () => (
    <Modal visible={reviewsVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setReviewsVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>My Reviews</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewProduct}>Nike Air Max 270 React</Text>
            <View style={styles.reviewRating}>
              {[1,2,3,4,5].map((star) => (
                <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
              ))}
            </View>
            <Text style={styles.reviewText}>Amazing comfort and style! Perfect for daily wear.</Text>
            <Text style={styles.reviewDate}>January 20, 2024</Text>
          </View>
          
          <View style={styles.reviewCard}>
            <Text style={styles.reviewProduct}>Crocs Classic Clog</Text>
            <View style={styles.reviewRating}>
              {[1,2,3,4].map((star) => (
                <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
              ))}
              <Star size={16} color="#E5E5EA" />
            </View>
            <Text style={styles.reviewText}>Very comfortable but wish they had more color options.</Text>
            <Text style={styles.reviewDate}>January 15, 2024</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const SettingsModal = () => (
    <Modal visible={settingsVisible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setSettingsVisible(false)}>
            <X size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>App Preferences</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>Language</Text>
              <Text style={styles.settingsItemValue}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>Currency</Text>
              <Text style={styles.settingsItemValue}>USD</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>Privacy</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userEmail}>{userProfile.email}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Orders</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>28</Text>
                  <Text style={styles.statLabel}>Reviews</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Orders</Text>
          <MenuItem
            icon={<Package size={20} color="#007AFF" />}
            title="My Orders"
            subtitle="Track and manage orders"
            onPress={() => setOrdersVisible(true)}
          />
          <MenuItem
            icon={<Star size={20} color="#FF6B35" />}
            title="Reviews"
            subtitle="Rate your purchases"
            onPress={() => setReviewsVisible(true)}
            showBadge
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuItem
            icon={<User size={20} color="#34C759" />}
            title="Edit Profile"
            subtitle="Update your information"
            onPress={() => setEditProfileVisible(true)}
          />
          <MenuItem
            icon={<CreditCard size={20} color="#FF9500" />}
            title="Payment Methods"
            subtitle="Manage cards and billing"
            onPress={() => setPaymentMethodsVisible(true)}
          />
          <MenuItem
            icon={<Bell size={20} color="#AF52DE" />}
            title="Notifications"
            subtitle="Customize your alerts"
            onPress={() => setNotificationsVisible(true)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem
            icon={<HelpCircle size={20} color="#007AFF" />}
            title="Help Center"
            subtitle="FAQ and support"
            onPress={() => setHelpCenterVisible(true)}
          />
          <MenuItem
            icon={<Settings size={20} color="#8E8E93" />}
            title="Settings"
            subtitle="App preferences"
            onPress={() => setSettingsVisible(true)}
          />
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>GoSneak v1.0.0</Text>
        </View>
      </ScrollView>

      <EditProfileModal />
      <OrdersModal />
      <PaymentMethodsModal />
      <NotificationsModal />
      <HelpCenterModal />
      <ReviewsModal />
      <SettingsModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 8,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  // Edit Profile Modal
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1D1D1F',
  },
  // Orders Modal
  orderCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#1D1D1F',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  // Payment Methods Modal
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  paymentNumber: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  paymentExpiry: {
    fontSize: 14,
    color: '#8E8E93',
  },
  editButton: {
    padding: 8,
  },
  // Notifications Modal
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  notificationTitle: {
    fontSize: 16,
    color: '#1D1D1F',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#007AFF',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  // Help Center Modal
  helpSection: {
    marginBottom: 32,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  helpItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  helpQuestion: {
    fontSize: 16,
    color: '#1D1D1F',
  },
  contactButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Reviews Modal
  reviewCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewProduct: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#1D1D1F',
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  // Settings Modal
  settingsSection: {
    marginBottom: 32,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingsItemText: {
    fontSize: 16,
    color: '#1D1D1F',
  },
  settingsItemValue: {
    fontSize: 16,
    color: '#8E8E93',
  },
});