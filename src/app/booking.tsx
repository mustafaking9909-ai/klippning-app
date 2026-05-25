const handleBooking = async () => {
  try {
    console.log("🔥 BOOK CLICKED");

    if (!name || !phone || !selectedTime) {
      console.log("❌ MISSING FIELDS", {
        name,
        phone,
        selectedTime,
      });
      Alert.alert("Fyll i alla fält");
      return;
    }

    console.log("🚀 BEFORE INSERT");

    const bookingData = {
      name,
      phone,
      day: selectedDay,
      time: selectedTime,
      service,
      beard,
      price,
      status: "confirmed",
      created_at: new Date().toISOString(),
    };

    console.log("📦 DATA:", bookingData);

    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingData])
      .select();

    console.log("📡 SUPABASE RESPONSE:", { data, error });

    if (error) {
      Alert.alert("ERROR", JSON.stringify(error));
      return;
    }

    console.log("✅ SUCCESS");

    Alert.alert("💈 Bokning klar!");

  } catch (err) {
    console.log("💥 CRASH:", err);
    Alert.alert("CRASH", JSON.stringify(err));
  }
};