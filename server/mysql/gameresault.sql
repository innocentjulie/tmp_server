/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : gameresault

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2018-01-18 17:49:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `bjl`
-- ----------------------------
DROP TABLE IF EXISTS `bjl`;
CREATE TABLE `bjl` (
  `id` varchar(11) NOT NULL DEFAULT '' COMMENT '64',
  `name` varchar(255) DEFAULT '""',
  `deskid` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `resault` int(64) DEFAULT '0' COMMENT '开机结果',
  PRIMARY KEY (`id`),
  KEY `time` (`time`) USING BTREE,
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bjl
-- ----------------------------
INSERT INTO `bjl` VALUES ('1', '1', '1', '1516176601', '67');
INSERT INTO `bjl` VALUES ('1516267090', '1', '1', '1516267090', '73');

-- ----------------------------
-- Table structure for `lh`
-- ----------------------------
DROP TABLE IF EXISTS `lh`;
CREATE TABLE `lh` (
  `id` varchar(11) NOT NULL DEFAULT '' COMMENT '64',
  `name` varchar(255) DEFAULT '""',
  `deskid` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `resault` int(64) DEFAULT '0' COMMENT '开机结果',
  PRIMARY KEY (`id`),
  KEY `time` (`time`) USING BTREE,
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of lh
-- ----------------------------
