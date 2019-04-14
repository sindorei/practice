package com.demo.factory;

public class MainApp {

	public static void main(String[] args) {
		ISwordFactory swordFactory = new Caocao();
		AbstractSword sword = swordFactory.createSword();
		System.out.println("曹操使用" + sword.getName() + "刺杀董卓！");

	}

}
