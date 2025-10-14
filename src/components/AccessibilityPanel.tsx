import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, Volume2, Type, Zap } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

interface AccessibilityPanelProps {
  className?: string;
}

export const AccessibilityPanel = ({ className }: AccessibilityPanelProps) => {
  const { settings, updateSettings, speak, vibrate } = useAccessibility();

  const handleToggleSetting = (setting: keyof typeof settings) => {
    const newValue = !settings[setting];
    updateSettings({ [setting]: newValue });
    
    // Provide audio feedback for the change
    const settingNames = {
      highContrast: "High contrast mode",
      largeText: "Large text mode", 
      reduceMotion: "Reduce motion mode",
      voiceEnabled: "Voice announcements",
      brailleEnabled: "Refreshable braille display"
    };
    
    const status = newValue ? "enabled" : "disabled";
    speak(`${settingNames[setting]} ${status}`);
  };

  const handleTestAudio = () => {
    speak("This is a test of the text-to-speech system. You should be able to hear this message clearly!", { rate: 0.8 });
  };

  return (
    <Card className={`p-6 space-y-6 ${className}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Eye className="w-6 h-6 text-primary" />
          Accessibility Settings
        </h2>
        <p className="text-muted-foreground">
          Customize the app to work best for you
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {/* High Contrast */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="high-contrast" className="text-lg font-medium">
              High Contrast Mode
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Makes colors stronger and easier to see
            </p>
          </div>
          <Switch
            id="high-contrast"
            checked={settings.highContrast}
            onCheckedChange={() => handleToggleSetting('highContrast')}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {/* Large Text */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="large-text" className="text-lg font-medium flex items-center gap-2">
              <Type className="w-4 h-4" />
              Large Text
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Makes all text bigger and easier to read
            </p>
          </div>
          <Switch
            id="large-text"
            checked={settings.largeText}
            onCheckedChange={() => handleToggleSetting('largeText')}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {/* Reduce Motion */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="reduce-motion" className="text-lg font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Reduce Animations
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Makes the app move less for comfort
            </p>
          </div>
          <Switch
            id="reduce-motion"
            checked={settings.reduceMotion}
            onCheckedChange={() => handleToggleSetting('reduceMotion')}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {/* Voice Enabled */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="voice-enabled" className="text-lg font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Voice Announcements
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              The app will read questions and feedback aloud
            </p>
          </div>
          <Switch
            id="voice-enabled"
            checked={settings.voiceEnabled}
            onCheckedChange={() => handleToggleSetting('voiceEnabled')}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {/* Braille Display */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="braille-enabled" className="text-lg font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Refreshable Braille Display
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Enable support for refreshable braille displays
            </p>
          </div>
          <Switch
            id="braille-enabled"
            checked={settings.brailleEnabled}
            onCheckedChange={() => handleToggleSetting('brailleEnabled')}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>

      <Separator />

      {/* Test Audio Button */}
      <div className="space-y-3">
        <Label className="text-lg font-medium">Test Audio</Label>
        <Button
          onClick={handleTestAudio}
          variant="outline"
          className="w-full text-lg py-4"
          disabled={!settings.voiceEnabled}
        >
          <Volume2 className="w-5 h-5 mr-3" />
          Test Voice Reading
        </Button>
        {!settings.voiceEnabled && (
          <p className="text-sm text-muted-foreground text-center">
            Enable voice announcements to test audio
          </p>
        )}
      </div>

      {/* Test Haptics Button */}
      <div className="space-y-3">
        <Label className="text-lg font-medium">Test Haptics</Label>
        <Button
          onClick={() => {
            if (!('vibrate' in navigator)) {
              speak("Haptics may not be supported on this device or browser. iPhones using Safari do not support vibrations on the web.");
              return;
            }
            vibrate([200, 100, 200]);
            speak("If you felt a buzz, haptics are working on your device!");
          }}
          variant="outline"
          className="w-full text-lg py-4"
        >
          <Zap className="w-5 h-5 mr-3" />
          Test Haptic Feedback
        </Button>
        <p className="text-sm text-muted-foreground">
          Note: Web haptics are supported on most Android devices in Chrome. iOS Safari does not support the Vibration API. For full haptics on iOS, a native wrapper (Capacitor) is required.
        </p>
      </div>
    </Card>
  );
};