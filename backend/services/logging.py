import logging.config as config
import os

LOG_FILE_PATH = "app/logs.log"
os.makedirs(os.path.dirname(LOG_FILE_PATH), exist_ok=True)


def setup_logging(debug_level="INFO"):
    LOGGING_CONFIG = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "format": "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
                "datefmt": "%d-%m-%Y %H:%M:%S"
            }
        },
        "handlers": {
            "file": {
                "class": "logging.FileHandler",
                "level": "DEBUG",
                "formatter": "default",
                "filename": LOG_FILE_PATH,
                "mode": "a",
                "encoding": "utf-8"
            },
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
                "level": debug_level
            }
        },
        "root": {
            "level": "DEBUG",
            "handlers": ["file", "console"]
        }
    }
    
    config.dictConfig(LOGGING_CONFIG)