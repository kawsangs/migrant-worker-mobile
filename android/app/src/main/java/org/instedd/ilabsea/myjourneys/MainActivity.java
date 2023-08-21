package org.instedd.ilabsea.myjourneys;

import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here
import android.content.Intent;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Intent intent = new Intent(this, MainActivity.class);

    // Pass along FCM messages/notifications etc. (to make the messaging().onNotificationOpenedApp get called when pressing the push notification while the appp is in quit state)
    Bundle extras = getIntent().getExtras();
    if (extras != null) {
        intent.putExtras(extras);
    }
    startActivity(intent);

    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MigrantWorkerMobile";
  }
}
