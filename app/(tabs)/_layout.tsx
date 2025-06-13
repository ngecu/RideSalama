import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo vector icons

export default function AppTabs() {
  const isRider = true; // Replace with your actual logic
const userType = isRider ? "rider" : "user";

  return (
    <Tabs>
      {isRider ? (
        <>
          <Tabs.Screen
            // name="dashboard"
             name={`${userType}/dashboard`}
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="speed" size={28} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="my-rides"
            options={{
              title: "My Rides",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="history" size={28} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="ratings"
            options={{
              title: "Ratings",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="star" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            // name="chama"
             name={`${userType}/chama`}

            options={{
              title: "Chama",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="account-balance-wallet" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="gamification"
            options={{
              title: "Badges",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="emoji-events" size={28} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="send" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: "Orders",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="shopping-cart" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: "Favorites",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="favorite" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="report"
            options={{
              title: "Report",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="error-outline" size={28} color={color} />
              ),
            }}
          />
        </>
      )}

      {/* Common Tabs */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
