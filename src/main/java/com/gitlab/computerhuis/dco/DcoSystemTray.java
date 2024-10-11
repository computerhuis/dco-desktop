package com.gitlab.computerhuis.dco;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.net.URI;

@Slf4j
@RequiredArgsConstructor
@Component
class DcoSystemTray {

    private final ApplicationContext applicationContext;

    @Value("${server.port}")
    private String serverPort;

    public void close() {
        log.info("Stop running dco-dashboard");
        SpringApplication.exit(applicationContext);
        try {
            Thread.sleep(1010);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.exit(0);
    }

    public void start() {
        try {
            val menu = new PopupMenu();
            val open = new MenuItem("Open");
            open.addActionListener(e -> {
                        if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                            try {
                                val url = "https://127.0.0.1:" + serverPort;
                                log.info("Opening: {}", url);
                                Desktop.getDesktop().browse(new URI(url));
                            } catch (Exception browserE) {
                                log.error("Exception: {}", browserE.getMessage());
                            }
                        }
                    }
            );
            menu.add(open);

            val close = new MenuItem("Afsluiten");
            close.addActionListener(e -> {
                if (JOptionPane.showConfirmDialog(null, "Weet u zeker dat u dco wilt afsluiten?", "WARNING", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
                    close();
                }
            });
            menu.add(close);

            val tray = SystemTray.getSystemTray();

            // Remove old
            for (val icon : tray.getTrayIcons()) {
                tray.remove(icon);
            }

            // Add new
            val image = new ImageIcon(DcoSystemTray.class.getResource("/assets/images/logo-ct.png")).getImage();
            val trayIcon = new TrayIcon(image, "Computerhuis dco", menu);
            trayIcon.setImageAutoSize(true);
            tray.add(trayIcon);
        } catch (Exception e) {
            log.warn("Exception: {}", e.getMessage());
        }
    }
}
